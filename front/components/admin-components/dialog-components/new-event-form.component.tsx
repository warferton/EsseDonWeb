import { useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { 
    Grid, 
    Typography, 
    Switch, 
    Container, 
    Box, 
    Button,
    InputAdornment, 
    makeStyles 
} from '@material-ui/core';
import { Backdrop } from '../../backdrop/backdrop.component';
import { motion } from 'framer-motion';
import { UploadButton } from './form-components/upload-button.component';
import { SnackbarAlert } from '../../alerts/snackbar.component';
import { IEvent, IUploadEvent } from '../../../types/event/event.type';
import axios from 'axios';
import consts from '../../../utils/consts';



interface IProps{
    event: IEvent;
    isUpdate: boolean;
}

const useStyles = makeStyles({
    glowText: {
        color: '#971391',
        textDecoration: 'underline',
        textShadow: '0px 0px 0.3px #971391'
    },
    container: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0,
        maxWidth: '100%',
    },
    header: {
        maxWidth: '100vw',
        padding: '1rem',
        backgroundColor:'black',
        color: 'white',
    },
    formBody: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
    },
    formField: {
        margin: '0.7rem',
    },
    uploadField: {
        marginTop: '1.5rem',
        margin: '0.7rem',
    },
    motionFormField: {
        margin: '0.7rem',
        width: 'calc(100% - 22px)',
    },
    formButton: {
        backgroundImage: 'conic-gradient(from 45grad at 5% -3%, #ff0000, 50grad, #7b64ff)',
        paddingTop: '0.7rem',
        paddingBottom: '0.7rem',
        marginTop: '0.7rem',
    },
    uploadBox: {
        maxWidth: '100%',
        justifyContent: 'center',
        display: 'flex',
    },
    redText: {
        color: 'red'
    }
})

export function CreateEventForm(props: IProps) {

    const { 
        _id,
        title, 
        lineup, 
        shortDescription,
        date, 
        time, 
        free, 
        deposit,
        price, 
        image, 
        videoLink,
        tcLink,
        group,
        active
    } = props.event;

    let { description } = props.event;

    const { isUpdate } = props;

    const [isFreeEvent, setIsFreeEvent] = useState(free === 'true');

    const [media, setMedia] = useState(image as any);

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const styles = useStyles();

    const isFree = useRef(free === 'true');

    const handleChecked = () =>{
        isFree.current = !isFree.current;
        setIsFreeEvent(!isFreeEvent);
    }

    const handleUploadImage = (fileData : any) =>{
        console.log(fileData);
        setMedia(fileData);
    }

    console.log(image);
    
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const SUCCESS_MESSAGE = 'Операция проведена успешно';
    const [ERROR_MESSAGE, setErrorMsg] = useState('Произошла ошибка');
    const API_ENDPOINT = isUpdate ? 'update' : 'create';

    if (description !== undefined && description !== null) {
       description = description.split('<br/>').join('\n').replace(/\n\n/g, '\n');;
    }

    return(
        <Container className={ styles.container }>
            <Box>
                <Formik
                initialValues={{
                    _id: _id || '',
                    title: title || '',
                    lineup: lineup || [],
                    description: description || '',
                    shortDescription: shortDescription || '',
                    date: date || '',
                    time: time || '',
                    free: isFreeEvent,
                    deposit: deposit || '',
                    price: price || '',
                    media: image || null,
                    videoLink: videoLink || '',
                    tcLink: tcLink || '',
                    group: group || 'general',
                    active: active || true,
                }}
                validate={values => {
                    const errors: Partial<IUploadEvent> = {};
                    if(!values.title){
                        errors.title = 'Обязательное поле';
                    }
                    if(!values.description){
                        errors.description = 'Обязательное поле';
                    }
                    if(!isFreeEvent && !values.price){
                        errors.price = 'Обязательное поле | Неверный формат';
                    }
                    if(!values.date){
                        errors.date = 'Обязательное поле';
                    }
                    if(!values.time){
                        errors.time = 'Обязательное поле';
                    }
                    if(!isFreeEvent && !values.tcLink){
                        errors.tcLink = 'Обязательное поле';
                    }
                    if(!media){
                        errors.media = 'Обязательное поле';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setOpenBackdrop(true);
                    setSubmitting(true);
                    const formData = new FormData();
                    Object.entries(values).forEach(value => {
                        formData.append(value[0], value[1]?.toString());
                    })
                    formData.set('media', media);
                    formData.set('free', `${isFree.current}`)

                    if(isUpdate){
                        axios.put(`${ consts.CREATE_EVENT_API_URL }${ API_ENDPOINT }`, formData, {withCredentials: true, headers: {'Content-Type': "multipart/form-data"}})
                            .then(res => {
                                setOpenBackdrop(false);
                                setOpenSuccessSnackbar( true );
                                setSubmitting(false);
                            })
			    .then(() => {
			        window.location.reload();
			    })
			    .catch( err => {
                                setOpenBackdrop(false);
                                console.error(err); 
                                setErrorMsg(`Произошла ошибка: ${err?.message}`);
                                setSubmitting(false);
                                setOpenErrorSnackbar( true );
                            });
                    }
                    else {
                        axios.post(`${ consts.CREATE_EVENT_API_URL }${ API_ENDPOINT }`, formData, {withCredentials: true, headers: {'Content-Type': "multipart/form-data"}})
                            .then(res => {
                                setOpenBackdrop(false);
                                setSubmitting(false);
                                setOpenSuccessSnackbar( true );
                            }).catch( err => {
                                setOpenBackdrop(false);
                                console.error(err); 
                                setErrorMsg(`Произошла ошибка: ${err?.message}`);
                                setSubmitting(false);
                                setOpenErrorSnackbar( true );
                            });
                    }

                }}
                >
                {({ submitForm, isSubmitting }) => (
                    <Form className={ styles.formBody }>

                        <Field
                        component={ TextField }
                        name="title"
                        type="text"
                        label="Название"
                        variant="outlined"
                        className={ styles.formField }
                        />

                        <Field
                        component={ TextField }
                        name="shortDescription"
                        type="text"
                        label="Краткое Описание"
                        variant="outlined"
                        className={ styles.formField }
                        />

                        <Field
                        component={ TextField }
                        name="description"
                        type="text"
                        label="Описание"
                        variant="outlined"
                        multiline
                        rows={ 3 }
                        className={ styles.formField }
                        />

                        <Field
                        component={ TextField }
                        name="lineup"
                        type="text"
                        label="Состав"
                        variant="outlined"
                        className={ styles.formField }
                        />

                        <Field
                        component={ TextField }
                        name="date"
                        type="date"
                        label="Дата"
                        variant="outlined"
                        className={ styles.formField }
                        InputLabelProps={{ shrink: true }}
                        />

                        <Field
                        component={ TextField }
                        name="time"
                        type="time"
                        label="Вермя"
                        variant='outlined'
                        className={ styles.formField }
                        InputLabelProps={{ shrink: true }}
                        />
                        
                        <Field
                        name="media"
                        value={ media || "null" }
                        hidden
                        />
                        { media ?
                            <Typography>
                                { `Выбраный файл: ${ media.name ? media.name : media }` }
                            </Typography>
                            :
                            <Typography className={ styles.redText }>
                                { `Файл не выбран` }
                            </Typography>
                        }
                        <Box className={ styles.uploadBox }>
                            <UploadButton
                            handleUpload={ handleUploadImage }
                            />
                        </Box>

                        <Field
                        component={ TextField }
                        name="videoLink"
                        type="text"
                        label="Ссылка на видео"
                        variant="outlined"
                        className={ styles.formField }
                        />

                        <Typography 
                        align='center' 
                        component="div"
                        >
                            <Grid 
                            component="label" 
                            container 
                            alignItems="center" 
                            justify='center' 
                            spacing={1}
                            >
                                <Grid 
                                item 
                                className={isFreeEvent ? styles.glowText : ''}
                                >
                                    Бесплатное
                                </Grid>
                                <Grid item>
                                    <Field
                                    component={ Switch }
                                    name="free"
                                    label="Переключатель"
                                    variant="outlined"
                                    className={ styles.formField }
                                    checked={ !isFreeEvent } 
                                    // value={ isFreeEvent }
                                    onChange={ handleChecked }
                                    />
                                </Grid>
                                <Grid 
                                item 
                                className={!isFreeEvent ? styles.glowText : ''}>
                                    Платное
                                </Grid>
                            </Grid>
                        </Typography>

                        {
                            !isFreeEvent &&

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: 200
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}
                                transition={{
                                    stiffness: 200,
                                    damping: 17,
                                    type: 'spring',
                                    duration: 1
                                }}
                                
                            >
                                <Field
                                component={ TextField }
                                name="price"
                                type="number"
                                label="Цена"
                                variant="outlined"
                                className={ styles.motionFormField }
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                                }}
                                />

                                <Field
                                component={ TextField }
                                name="tcLink"
                                type="text"
                                label="Ссылка на TicketCloud"
                                variant="outlined"
                                className={ styles.motionFormField }
                                />

                            </motion.div>
                        }
                        {
                            isFreeEvent &&
                            <motion.div
                            initial={{
                                opacity: 0,
                                x: -200
                            }}
                            animate={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{
                                stiffness: 200,
                                damping: 17,
                                type: 'spring',
                                duration: 1
                            }}
                            
                        >
                            <Field
                            component={ TextField }
                            name="deposit"
                            type="number"
                            label="Депозит"
                            variant="outlined"
                            className={ styles.motionFormField }
                            InputProps={{
                                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                                }}
                            />

                        </motion.div>
                        }

                        <Button
                        variant="contained"
                        color="primary"
                        disabled={ isSubmitting }
                        onClick={ submitForm }
                        className={ styles.formButton }
                        >
                        { props.event ? 
                            'Сохранить'
                            :
                            'Создать'
                        }
                        </Button>

                    </Form>
                    )}
                </Formik>
            </Box>
            <SnackbarAlert open={ openSuccessSnackbar } onClose={() => setOpenSuccessSnackbar(false)} severity="success">
                        { SUCCESS_MESSAGE }
            </SnackbarAlert>       
            <SnackbarAlert open={ openErrorSnackbar } onClose={() => setOpenErrorSnackbar(false)} severity="error">
                        { ERROR_MESSAGE }
            </SnackbarAlert>

            <Backdrop open={ openBackdrop }/>

        </Container>
    )
}
