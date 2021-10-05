import { 
    Box,
    Button,
    Typography, 
    List, 
    makeStyles
} from '@material-ui/core'
import { Formik, Form } from 'formik';
import { SaveOutlined as SaveIcon } from '@material-ui/icons';
import { Dispatch, useState } from 'react';
import { IEvent } from '../../../types/event/event.type';
import { SnackbarAlert } from '../../alerts/snackbar.component';

import axios from 'axios';


interface IProps {
    childWrapper: any;
    children?: IEvent[];
    noButton?: boolean;
    controlFunction: Dispatch<any>;
}

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxHeight: 270,
      backgroundColor: 'white',
      overflow: 'scroll',
      scrollbarColor: 'white',
    },
    buttonBox: {
        padding: '10px',
    },
    saveButton: {
        backgroundImage: 'conic-gradient(from 45grad at 5% -3%,#ff0000,50grad,#7b64ff)',
        color: 'white',
    }
}, { index: 1 });



export function EventControlList(props : IProps) {

    const { childWrapper: Wrapper, children, controlFunction, noButton } = props;

    const childEvents = children.map( (event: IEvent) => {
        const labelId = `selector-list-secondary-label-${event.title}`;
        return (
            <Wrapper 
            key={ event._id }
            event={ event }
            id={ labelId } 
            handleOpen={ controlFunction }
            archived={ !event.active }
            />
        );
    })

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const eventsUpdateLink = 'https://esse-api-test.herokuapp.com/api/v1/spe1Ce/control/admin/events/update/switchDb';

    const SUCCESS_MESSAGE = 'Событие успешно обновлено';
    let ERROR_MESSAGE = `Произошла ошибка: `;

    const classes = useStyles();

    return(
        <>
        <Formik
        initialValues={{
            events: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            axios.put(eventsUpdateLink, children, {withCredentials: true})
                .then(res => {
                    if(res.status === 200) 
                    setOpenSuccessSnackbar( true );
                })
                .then(() => setSubmitting(false))
                .then(() => window.location.reload())
                .catch( err => {
                    console.error(err); 
                    ERROR_MESSAGE.concat(err?.name);
                    setOpenErrorSnackbar( true );
                });    
        }}
        >
        {({ submitForm, isSubmitting }) => (
            <Form>
                <List dense className={classes.root}>
                    { childEvents }
                </List>
                <Box className={ classes.buttonBox }>
                {!noButton &&
                    <Button 
                    fullWidth
                    endIcon={ <SaveIcon/> } 
                    className={ classes.saveButton }
                    onClick={ submitForm }
                    >
                        <Typography>
                            Save
                        </Typography>
                    </Button>
                }
                </Box>
            </Form>
            )}
        </Formik>
    
        <SnackbarAlert open={ openSuccessSnackbar } onClose={() => setOpenSuccessSnackbar(false)} severity="success">
                { SUCCESS_MESSAGE }
        </SnackbarAlert>       
        <SnackbarAlert open={ openErrorSnackbar } onClose={() => setOpenErrorSnackbar(false)} severity="error">
                { ERROR_MESSAGE }
        </SnackbarAlert>
        </>
    );
}
