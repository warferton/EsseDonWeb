import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid, Typography, Switch, Container, Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';

import { IEvent } from '../../types/event/event.type';

import styles from '../../styles/BookingForm.module.css';



interface IProps{
    event: IEvent;
}


const useStyles = makeStyles({
    glowText: {
        color: '#971391',
        textDecoration: 'underline',
        textShadow: '0px 0px 0.3px #971391'
    },
})

export function CreateEventForm(props: IProps) {

    const { 
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
        tcLink 
    } = props.event;

    const [ isFreeEvent, setIsFreeEvent] = useState(free);

    const classes = useStyles();

    const handleChecked = () =>{
        setIsFreeEvent(!isFreeEvent);
    }

    return(
        <Container className={ styles.container }>
            <Box>
                <Formik
                initialValues={{
                    title: title || '',
                    lineup: lineup || [],
                    description: description || '',
                    shortDescription: shortDescription || '',
                    date: date || '',
                    time: time || '',
                    free: isFreeEvent,
                    deposit: deposit || '',
                    price: price || '',
                    image: image || '',
                    videoLink: videoLink || '',
                    tcLink: tcLink || '',
                }}
                validate={values => {
                    const errors: Partial<IEvent> = {};
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
                    if(!values.image){
                        errors.image = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    values.free = isFreeEvent;
                    setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                    }, 4000);
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
                        name="shortDecription"
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
                        component={ TextField }
                        name="image"
                        type="text"
                        label="Фото"
                        variant="outlined"
                        className={ styles.formField }
                        />

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
                                className={isFreeEvent ? classes.glowText : ''}
                                >
                                    Бесплатное
                                </Grid>
                                <Grid item>

                                    <Field
                                    component={ Switch }
                                    name="free"
                                    label="Состав"
                                    variant="outlined"
                                    className={ styles.formField }
                                    checked={ !isFreeEvent } 
                                    value={ isFreeEvent || false }
                                    onChange={ handleChecked }
                                    />
                                </Grid>
                                <Grid 
                                item 
                                className={!isFreeEvent ? classes.glowText : ''}>
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
                                style={{ width: 'calc(100% - 22px)'}}
                                className={ styles.formField }
                                />

                                <Field
                                component={ TextField }
                                name="ticketCloudLink"
                                type="text"
                                label="Ссылка на TicketCloud"
                                variant="outlined"
                                style={{ width: 'calc(100% - 22px)'}}
                                className={ styles.formField }
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
                            style={{ width: 'calc(100% - 22px)'}}
                            className={ styles.formField }
                            />

                        </motion.div>
                        }
                        


                        {isSubmitting && 
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
        </Container>
    )
}