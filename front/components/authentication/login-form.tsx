import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Button, LinearProgress, makeStyles } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import { SnackbarAlert } from '../alerts/snackbar.component';
import { Backdrop } from '../backdrop/backdrop.component';

import axios from 'axios';


const useStyles = makeStyles({
    formBody: {
        display: 'flex',
        flexDirection: 'column',
        border:'1.7px solid #00000085',
        borderRadius: '5px',
        padding: '1rem',
        margin: '1rem',
        marginTop: '4rem',
        boxShadow: '0px 5px 7px #55555565'
    },
    formField: {
        minWidth: 'inherit',
        margin: '0.7rem'
    },
    formButton: {
        minWidth: '40%',
        maxWidth: '60%',
        height: '3rem',
        marginTop: '1.5rem',
        color: 'white',
        backgroundColor: '#222222',
        alignSelf: 'center',
        '&:hover': {
            backgroundColor: '#555555'
        }
    }
});

interface Values {
    username: string;
    password: string;
}

export function LoginForm() {
    const classes = useStyles();

    const router = useRouter();

    const SUCCESS_MESSAGE = 'Успешный Вход!';
    let ERROR_MESSAGE = `Неправильное имя пользователя или пароль!`;

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    return(
        <>
        <Container>
            <Formik
                initialValues={{
                    username: '',
                    password:'',
                }}
                validate={(values: Values) => {
                    const errors: Partial<Values> = {};
                    if(!values.username){
                        errors.username = 'Обязательное поле';
                    }
                    if(!values.password){
                        errors.password = 'Обязательное поле';
                    }
                    
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                   setOpenBackdrop(true); 
                   setSubmitting(true);
                    axios.post('http://193.168.3.162:3030/api/v1/auth/login', values, { withCredentials: true })
                    .then( res => {
                        if(res.status === 200) {
                            setOpenBackdrop(false);
                            setOpenSuccessSnackbar(true);
                            router.push('/admin');
                        }
                    }).catch( err => {
                        setOpenBackdrop(false);
                        setOpenErrorSnackbar(true);
                    })
                    setSubmitting(false);
                }}
                >
                {({ submitForm, isSubmitting }) => (
                    <Form className={ classes.formBody }>

                         <Field
                            component={ TextField }
                            type="text"
                            name="username"
                            label="Логин"
                            variant="outlined"
                            className={ classes.formField }
                        />

                        <Field
                            component={ TextField }
                            name="password"
                            type="password"
                            label="Пароль"
                            variant="outlined"
                            className={ classes.formField }
                        />

                       { isSubmitting && <LinearProgress/> }

                        <Button
                            variant="contained"
                            color="primary"
                            disabled={ isSubmitting }
                            onClick={ submitForm }
                            className={ classes.formButton }
                        >
                            Отправить
                        </Button>

                    </Form>
                    )}
                </Formik>
        </Container>
        <Backdrop open={ openBackdrop }/>
        <SnackbarAlert open={ openSuccessSnackbar } onClose={() => setOpenSuccessSnackbar(false)} severity="success">
                { SUCCESS_MESSAGE }
        </SnackbarAlert>       
        <SnackbarAlert open={ openErrorSnackbar } onClose={() => setOpenErrorSnackbar(false)} severity="error">
                { ERROR_MESSAGE }
        </SnackbarAlert>
        </>
    )

}