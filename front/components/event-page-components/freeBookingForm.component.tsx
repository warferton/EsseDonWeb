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
            <Box className={styles.headerBox}>
                <Typography variant='h4' className={ styles.sectionHeader }>
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
                        errors.name = 'Обязательное поле';
                    }
                    if(!values.tel){
                        errors.tel = 'Обязательное поле';
                    }
                    else if(!PhoneRegex.test(values.tel)){
                        errors.tel = 'Неверный формат';
                    }
                    else if (!Number.isInteger(values.peopleCount)) {
                        errors.peopleCount = 'Недопустимое значение';
                    }
                    if (!values.email) {
                        errors.email = 'Обязательное поле';
                    } 
                    else if (!EmailRegex.test(values.email)){
                        errors.email = 'Неверный формат Email';
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
                    axios.post('http://193.168.3.162:3030/api/v1/mailing/bookingMail', bookingData)
                    .then(response => {
                        setSubmitting( false );
                        if(response.status === 200) {
                            setOpenSuccessSnackbar( true );
                        }
                    })
                    .catch(err => {
                        setSubmitting( false );
                        ERROR_MESSAGE.concat(err.message);
                        setOpenErrorSnackbar( true );
                    });
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
                            disabled={ isSubmitting }
                            className={ styles.formField }
                        />

                        <Field
                            component={ TextField }
                            name="tel"
                            type="tel"
                            label="Телефон"
                            variant="outlined"
                            disabled={ isSubmitting }
                            className={ styles.formField }
                        />

                        <Field
                            component={ TextField }
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            disabled={ isSubmitting }
                            className={ styles.formField }
                        />

                         <Field
                            component={ TextField }
                            name="peopleCount"
                            type="number"
                            label="Количество Персон"
                            variant="outlined"
                            disabled={ isSubmitting }
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
                            disabled={ isSubmitting }
                            className={ styles.formField }
                        />

                        {isSubmitting && <LinearProgress />}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ submitForm }
                            disabled={ isSubmitting }
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
