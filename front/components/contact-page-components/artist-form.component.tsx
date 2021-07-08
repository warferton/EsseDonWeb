import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui'
import { Container, Box, Typography, Button, LinearProgress } from '@material-ui/core'
import { PhoneRegex, EmailRegex } from '../../regex/regex';

import styles from '../../styles/BookingForm.module.css'
import { Alert } from '../alerts/alert.component';


interface Values {
    name: string;
    email: string;
    tel: string;
    people_number: string;
    comment: string;
    videoLink: string;
}

export function ArtistForm() {


    return(
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
                    setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                    }, 3000);
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
                            name="videoLink"
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
    )
}