import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui'
import { Container, Box, Typography, Button, LinearProgress } from '@material-ui/core'
import { PhoneRegex, EmailRegex } from '../../regex/regex';
import styles from '../../styles/BookingForm.module.css'
import { Alert } from '../alerts/alert.component';
import { SnackbarAlert } from '../alerts/snackbar.component';
import axios from 'axios';


interface Values {
    name: string;
    email: string;
    tel: string;
    comment: string;
    url: string;
}

export function ArtistForm() {

    const SUCCESS_MESSAGE = 'Заявка успешно отправлена';
    let ERROR_MESSAGE = `Произошла ошибка: `;

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    return(
        <>
        <Container className={ styles.container }>
            <Box>
                <Typography variant='h6' className={ styles.header }>
                    Заявка на выступление в Эссе
                </Typography>
            </Box>
            <Box>
                <Alert severity="secondary" size='large'>
                    Мы открыты для сотрудничества и коллаборации. Расскажите о себе или поделитесь своей идеей и мы с вами свяжемся. 
                </Alert>
                <Formik
                initialValues={{
                    name: '',
                    tel:'',
                    email: '',
                    comment: '',
                    url: '',
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
                        errors.tel = 'Неправильный номер';
                    }
                    if (!values.comment){
                        errors.comment = 'Обязательное поле';
                    }
                    if (!values.email) {
                        errors.email = 'Обязательное поле';
                    } 
                    else if (!EmailRegex.test(values.email)){
                        errors.email = 'Неправильный адрес';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    axios.post('http://localhost:3030/api/v1/mailing/perfrormRequestMail', values)
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
                            name="comment"
                            type="text"
                            label="Напишите о себе или о вашей группе"
                            variant="outlined"
                            multiline
                            rows={ 3 }
                            className={ styles.formField }
                        />

                        <Field
                            component={ TextField }
                            name="url"
                            type="text"
                            label="Ссылка на видео"
                            variant="outlined"
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
                            Отправить
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