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
import { Backdrop } from '../../backdrop/backdrop.component';
import axios from 'axios';
import consts from '../../../utils/consts';


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

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const deleteIdList : string[] = [];
    const addToDeleteList = (id : string) => {
        if (!deleteIdList.includes(id)) {
            deleteIdList.push(id);
            console.log("PUSHED : " + id);
            console.log("DELETELIST = " + deleteIdList);
        }
    }
    const removeFromDeleteList = (id : string) => {
        if (deleteIdList.includes(id)) {
            const index = deleteIdList.indexOf(id);
            console.log('REMOVED ID :' + deleteIdList.splice(index, 1));
            console.log("DELETELIST = " + deleteIdList);
        }
    }

    const childEvents = children.map( (event: IEvent) => {
        const labelId = `selector-list-secondary-label-${event.title}`;
        return (
            <Wrapper 
            key={ event._id }
            event={ event }
            id={ labelId } 
            handleOpen={ controlFunction }
            archived={ !event.active }
            addToDeleteList={ addToDeleteList }
            removeFromDeleteList={ removeFromDeleteList }
            />
        );
    })

    const SUCCESS_MESSAGE = 'Событие успешно обновлено';
    let ERROR_MESSAGE = ``;

    const classes = useStyles();

    return(
        <>
        <Formik
        initialValues={{
            events: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
            setOpenBackdrop(true);
            setSubmitting(true);
            axios.put(consts.SWITCH_EVENT_STATUS_API_URL, children, {withCredentials: true})
                .then(res => {
                    if(res.status === 200) {
                        setOpenSuccessSnackbar( true );
                    }
                })
                .then(async () => {
                    if (deleteIdList.length > 0) {
                        await axios.post(consts.DELETE_EVENT_API_URL, deleteIdList, {withCredentials: true})
                            .then((res) => {
                                if(res.status === 200) {
                                    setOpenSuccessSnackbar( true );
                                }
                            }).catch((err) => {
                                setOpenBackdrop(false);
                                console.error(err); 
                                ERROR_MESSAGE = 'Произошла ошибка: '.concat(err?.name);
                                setOpenErrorSnackbar( true );
                            });
                    }
                })
                .then(() => { 
                    setOpenBackdrop(false);
                    setSubmitting(false) 
                })
                .then(() => {
                    window.location.reload();
                })
                .catch( err => {
                    setOpenBackdrop(false);
                    console.error(err); 
                    ERROR_MESSAGE = 'Произошла ошибка: '.concat(err?.name);
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
                    disabled={ isSubmitting }
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
        <Backdrop open={ openBackdrop }/>
        <SnackbarAlert open={ openSuccessSnackbar } onClose={() => setOpenSuccessSnackbar(false)} severity="success">
                { SUCCESS_MESSAGE }
        </SnackbarAlert>       
        <SnackbarAlert open={ openErrorSnackbar } onClose={() => setOpenErrorSnackbar(false)} severity="error">
                { ERROR_MESSAGE }
        </SnackbarAlert>
        </>
    );
}
