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
    componentWrapper: any;
    children?: IEvent[];
    buttonAlways?: boolean;
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

    const { componentWrapper: Wrapper, children: events, controlFunction, buttonAlways } = props;

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const [deleteIdList, setDeleteIdList] = useState<string[]>([]);
    const [switchDbList, setSwitchDbList] = useState<string[]>([]);
    const [updateGroupList, setUpdateGroupList] = useState<{ _id: string, group: string }[]>([]);

    const handleDelete = (id : string) => handleListUpdate(id, deleteIdList, setDeleteIdList);
    const handleSwitchDb = (id : string) => handleListUpdate(id, switchDbList, setSwitchDbList) ;
    const handleUpdateGroup = ( event : { _id: string, group: string, updated: boolean }) => handleGroupUpdate(event, updateGroupList, setUpdateGroupList);

    const wrappedEvents = events.map( (event: IEvent) => {
        const labelId = `selector-list-secondary-label-${event.title}`;
        return (
            <Wrapper 
            key={ event._id }
            event={ event }
            id={ labelId } 
            handleOpen={ controlFunction }
            archived={ !event.active }
            handleDelete={ handleDelete }
            handleSwitchDb={ handleSwitchDb }
            handleUpdateGroup={ handleUpdateGroup }
            />
        );
    })

    const SUCCESS_MESSAGE = 'Событие успешно обновлено';
    const [ERROR_MESSAGE, setErrorMessage] = useState(``);

    const classes = useStyles();

    return(
        <>
        <Formik
        initialValues={{
            events: [],
        }}
        onSubmit={(_, { setSubmitting }) => {
            setOpenBackdrop(true);
            setSubmitting(true);
            Promise.all([ switchDbs(switchDbList), deleteEvents(deleteIdList), updateEventGroups(updateGroupList) ])
                .then(() => { 
                    setOpenSuccessSnackbar(true); 
                })
                .then(() => {
                    window.location.reload();
                })
                .catch( err => {
                    console.error(err); 
                    setErrorMessage('Произошла ошибка: '.concat(err?.message));
                    setOpenErrorSnackbar(true);
                }).finally(() => {
                    setOpenBackdrop(false);
                    setSubmitting(false);
                }); 
        }}
        >
        {({ submitForm, isSubmitting }) => (
            <Form>
                <List dense className={ classes.root }>
                    { wrappedEvents }
                </List>
                <Box className={ classes.buttonBox }>
                <Button 
                fullWidth
                endIcon={ <SaveIcon/> } 
                className={ classes.saveButton }
                disabled={ isSubmitting  || !buttonAlways && switchDbList.length <= 0 && deleteIdList.length <= 0 }
                onClick={ submitForm }
                >
                    <Typography>
                        Сохранить
                    </Typography>
                </Button>
                </Box>
            </Form>
            )}
        </Formik>
        <Backdrop open={ openBackdrop }/>
        <SnackbarAlert open={ openSuccessSnackbar } onClose={() => setOpenSuccessSnackbar(false) } severity="success">
                { SUCCESS_MESSAGE }
        </SnackbarAlert>       
        <SnackbarAlert open={ openErrorSnackbar } onClose={() => setOpenErrorSnackbar(false) } severity="error">
                { ERROR_MESSAGE }
        </SnackbarAlert>
        </>
    );
}

async function deleteEvents(eventIdList: string[]) {
    if (eventIdList.length > 0) {
        return axios.post('consts.DELETE_EVENT_API_URL', eventIdList, {withCredentials: true})
    }
    return Promise.resolve();
}

async function switchDbs(eventIdList: string[]) {
    if (eventIdList.length > 0) {
        return axios.put('consts.SWITCH_EVENT_STATUS_API_URL', eventIdList, {withCredentials: true})
    }
    return Promise.resolve();
}

async function updateEventGroups(events: {_id: string, group: string}[]) {
     if (events.length > 0) {
         return axios.put(`${consts.CREATE_EVENT_API_URL}update/group`, events, {withCredentials: true})
    }
    return Promise.resolve();
}

function handleListUpdate(item: string, list: string[], handleFunc: any) {
    if (!list.includes(item)) {
        handleFunc([...list, item]);
    } else {
        const index = list.indexOf(item);
        list.splice(index, 1);
        handleFunc([...list]);
    }
}

function handleGroupUpdate(event: { _id: string; group: string; updated: boolean }, updateGroupList: { _id: string; group: string; }[], setUpdateGroupList: Dispatch<import("react").SetStateAction<{ _id: string; group: string; }[]>>) {
    const index = updateGroupList.findIndex((val, _, __) => event._id === val._id);
    const { updated, ...eventBody } = event
    console.log(`index: ${index}`)
    console.log(`updated: ${updated}`)
    if (index === -1 && updated) {
        setUpdateGroupList([...updateGroupList, eventBody])
    } else if (index >= 0) {
        updateGroupList.splice(index, 1);
        if (updated) {
            setUpdateGroupList([...updateGroupList, eventBody]);
        } else {
            setUpdateGroupList([...updateGroupList]);
        }
    }

}
