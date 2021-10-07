import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid, Typography, Switch, Container, Box, Button, CircularProgress, InputAdornment, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import axios from 'axios';
import { UploadButton } from './form-components/upload-button.component';
import { SnackbarAlert } from '../../alerts/snackbar.component';
import { IEvent, IUploadEvent } from '../../../types/event/event.type';



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
    }
})

export function CreateEventForm(props: IProps) {

    const { 
        _id,
        title, 
        lineup, 
        shortDescription,
        description, 
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

    const { isUpdate } = props;

    const [isFreeEvent, setIsFreeEvent] = useState(free);

    const [media, setMedia] = useState(null);

    const styles = useStyles();

    const handleChecked = () =>{
        setIsFreeEvent(!isFreeEvent);
    }


    const handleUploadImage = (fileData : any) =>{
        console.log(fileData);
        setMedia(fileData);
    }

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    let SUCCESS_MESSAGE = 'Операция проведена успешно';
    let ERROR_MESSAGE = 'Произошла ошибка: ';
    const API_ENDPOINT = isUpdate ? 'update' : 'create';

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
                        errors.title = 'Required';
                    }
                    if(!values.description){
                        errors.description = 'Required';
                    }
                    if(!isFreeEvent && !values.price){
                        errors.price = 'Обязательное поле | Неверный формат';
                    }
                    if(!values.date){
                        errors.date = 'Required';
                    }
                    if(!values.time){
                        errors.time = 'Required';
                    }
                    if(!isFreeEvent && !values.tcLink){
                        errors.tcLink = 'Required';
                    }
                    if(!media){
                        errors.media = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting, setFieldValue }) => {
                    setFieldValue('free', `${isFreeEvent}`)
                    const formData = new FormData();
                    Object.entries(values).forEach(value => {
                        formData.append(value[0], value[1]?.toString());
                    })
                    formData.set("media", media, media.name);
                    console.log(formData.entries);
                    
                    setSubmitting(true);
                    if(isUpdate){
                        axios.put(`http://localhost:3030/api/v1/spe1Ce/control/admin/events/${ API_ENDPOINT }`, formData, {withCredentials: true, headers: {'Content-Type': "multipart/form-data"}})
                            .then(res => {
                                setOpenSuccessSnackbar( true );
                            }).catch( err => {
                                console.error(err); 
                                ERROR_MESSAGE.concat(err?.name);
                                setOpenErrorSnackbar( true );
                            });
                    }
                    else {
                        axios.post(`http://localhost:3030/api/v1/spe1Ce/control/admin/events/${ API_ENDPOINT }`, formData, {withCredentials: true, headers: {'Content-Type': "multipart/form-data"}})
                            .then(res => {
                                setOpenSuccessSnackbar( true );
                            }).catch( err => {
                                console.error(err); 
                                ERROR_MESSAGE.concat(err?.name);
                                setOpenErrorSnackbar( true );
                            });
                    }
                        
                    setSubmitting(false);
                    
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
                        <Typography>
                            { media && `Выбраный файл: ${ media.name }` }
                        </Typography>
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
                                    value={ isFreeEvent || false }
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
                        


                        {
                            isSubmitting && 
                                <Box 
                                style={{ display:'flex', justifyContent: 'center'}}
                                >
                                    <CircularProgress/>
                                </Box>
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

        </Container>
    )
}