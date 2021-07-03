import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui'
import { Container, Box, Typography, Button, LinearProgress } from '@material-ui/core'

import styles from '../../../styles/BookingForm.module.css'


interface Values {
    name: string;
    email: string;
    tel: string;
    people_number: string;
    comment: string;
}

export function FreeEventForm() {

    const email_regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const telephone_regex =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; 

    return(
        <Container className={ styles.container }>
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
                    people_number: 1,
                }}
                validate={values => {
                    const errors: Partial<Values> = {};
                    if(!values.name){
                        errors.name = 'Required';
                    }
                    if(!values.tel){
                        errors.tel = 'Required';
                    }
                    else if(!telephone_regex.test(values.tel)){
                        errors.tel = 'Invalid phone number';
                    }
                    if (!Number.isInteger(values.people_number)) {
                        errors.people_number = 'Invalid number';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } 
                    else if (!email_regex.test(values.email)){
                        errors.email = 'Invalid email address';
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
                            name="people_number"
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
    )
}