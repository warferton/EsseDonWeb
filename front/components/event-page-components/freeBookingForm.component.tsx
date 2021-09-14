import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui'
import { Container, Box, Typography, Button, LinearProgress } from '@material-ui/core'
import { PhoneRegex, EmailRegex } from '../../regex/regex';
import { SnackbarAlert } from '../alerts/snackbar.component';
import { IEvent } from '../../types/event/event.type';
import { getLocalWeekDay } from '../../utils/date-utils';
import axios from 'axios';

import styles from '../../styles/BookingForm.module.css'

interface IProps{
    event: IEvent;
}

interface Values {
    name: string;
    email: string;
    tel: string;
    peopleCount: string;
    comment: string;
}

export function FreeEventForm({ event } : IProps) {

    const SUCCESS_MESSAGE = 'Заявка успешно отправлена';
    let ERROR_MESSAGE = `Произошла ошибка: `;

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    return(
        <>
        <Container className={ styles.container } id='form-box'>
            <Box>
                <Typography variant='h6' className={ styles.header }>
                    Забронировать
                </Typography>
            </Box>
            <Box>
                <Formik
                initialValues={{
                    name: '',
                    tel:'',
                    email: '',
                    peopleCount: 1,
                    comment: ''
                }}
                validate={values => {
                    const errors: Partial<Values> = {};
                    if(!values.name){
                        errors.name = 'Required';
                    }
                    if(!values.tel){
                        errors.tel = 'Required';
                    }
                    else if(!PhoneRegex.test(values.tel)){
                        errors.tel = 'Invalid phone number';
                    }
                    if (!Number.isInteger(values.peopleCount)) {
                        errors.peopleCount = 'Invalid number';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } 
                    else if (!EmailRegex.test(values.email)){
                        errors.email = 'Invalid email address';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const { name, email, tel, peopleCount, comment } = values;
                    const { title: eventName, time, date } = event
                    const weekDay = getLocalWeekDay(date);
                    const bookingData = {
                        eventName,
                        time,
                        date,
                        weekDay,
                        name,
                        tel,
                        email,
                        peopleCount,
                        comment
                    }
                    setSubmitting(true);
                    axios.post('http://localhost:3030/api/v1/mailing/bookingMail', bookingData)
                    .then(response => {
                        if(response.status === 200) {
                            setOpenSuccessSnackbar( true );
                        }
                    })
                    .catch(err => {
                        ERROR_MESSAGE.concat(err.message);
                        setOpenErrorSnackbar( true );
                    });
                    setSubmitting( false );
                }}
                >
                {({ submitForm, isSubmitting }) => (
                    <Form className={ styles.formBody }>

                         <Field
                            component={ TextField }
                            type="text"
                            label="Имя"
                            name="name"
                            variant="outlined"
                            className={ styles.formField }
                        />

                        <Field
                            component={ TextField }
                            name="tel"
                            type="tel"
                            label="Телефон"
                            variant="outlined"
                            className={ styles.formField }
                        />

                        <Field
                            component={ TextField }
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            className={ styles.formField }
                        />

                         <Field
                            component={ TextField }
                            name="peopleCount"
                            type="number"
                            label="Количество Персон"
                            variant="outlined"
                            className={ styles.formField }
                        />

                         <Field
                            component={ TextField }
                            name="comment"
                            type="text"
                            label="Комметарий"
                            variant="outlined"
                            multiline
                            rows={ 3 }
                            className={ styles.formField }
                        />

                        {isSubmitting && <LinearProgress />}

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={ isSubmitting }
                            onClick={ submitForm }
                            className={ styles.formButton }
                        >
                            Забронировать
                        </Button>

                    </Form>
                    )}
                </Formik>
            </Box>
        </Container>

        <SnackbarAlert open={ openSuccessSnackbar } onClose={() => setOpenSuccessSnackbar(false)} severity="success">
                { SUCCESS_MESSAGE }
        </SnackbarAlert>       
        <SnackbarAlert open={ openErrorSnackbar } onClose={() => setOpenErrorSnackbar(false)} severity="error">
                { ERROR_MESSAGE }
        </SnackbarAlert>
        </>
    )
}
