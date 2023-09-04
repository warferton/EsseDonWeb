import { Dispatch, useEffect, useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';
import Backup from '@material-ui/icons/Backup';
import { IEvent } from '../../../types/event/event.type';

interface ISelectorProps {
    event: IEvent;
    id: string;
}

export function EventListItemSelector(props : ISelectorProps) {

    const { event, id } = props; 

    const [group, setGroup] = useState( event.group );

    const handleChangeGroup = (changeEvent: React.ChangeEvent<{ value: string }>) => {
        const newGroup = changeEvent.target.value;
        setGroup(newGroup as string);
        event.group = newGroup;
    };


    return(
         <ListItem key={ event._id } button>
            <ListItemText id={ id } primary={ event.title } />
            <ListItemSecondaryAction>
            <Select
            labelId="group-select-label"
            id="group-select"
            value={ group }
            onChange={ handleChangeGroup }
            >
                <MenuItem value={ 'main' }>Гл. Блок</MenuItem>
                <MenuItem value={ 'second' }>Лучшее</MenuItem>
                <MenuItem value={ 'general' }>Общее</MenuItem>
            </Select>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

//================================================================
//================================================================

interface IButtonsProps {
    event: IEvent;
    archived: boolean;
    id: string;
    handleOpen: Dispatch<any>;
    handleDelete: (id: any) => any;
    handleSwitchDb: (id: any) => any;
}

export function EventListItemButtons(props : IButtonsProps) {

    const { event, id, archived, handleOpen, handleDelete, handleSwitchDb } = props; 
    
    const [cloudButtonColour, setCloudButtonColour] = useState(false);
    const [deleteButtonColour, setDeleteButtonColour] = useState(false);
    
    let isToDelete = false;
    let isToUpdate = false; 
    let isActive = event.active;

    useEffect(() => {}, [cloudButtonColour, deleteButtonColour]);

    const handleSwitchDbButton = () => {
        if (isToDelete) {
            console.log('Disable IsDelete Btn')
            handleDeleteButton(); // убираем маркировку для удаления если есть
        }
        isToUpdate = !isToUpdate;
        isActive = !isActive;
        handleSwitchDb(event._id);        
        setCloudButtonColour(!cloudButtonColour);
    }

    const handleDeleteButton = () => {
        if (isToUpdate) {
            console.log('Disable IsUpdate Btn')
            handleSwitchDbButton(); // убираем маркировку для смены БД если есть
        }
        handleDelete(event._id);
        setDeleteButtonColour(!deleteButtonColour);
        isToDelete = !isToDelete;
    }

    const handleClickOpen = () => {
        handleOpen( event );
    }

    return(
         <ListItem key={ event._id } button>
            <ListItemText id={ id } primary={ event.title } />
            <ListItemSecondaryAction>
            <ButtonGroup>
                <IconButton onClick={ handleClickOpen }>
                    <Settings/>
                </IconButton>
                <IconButton onClick={ handleSwitchDbButton } color={ cloudButtonColour ? 'primary' : 'default' }>
                    {archived ?  <Backup/> : <ArchiveIcon/>}
                </IconButton>
                { archived &&
                    <IconButton onClick={ handleDeleteButton } color={ deleteButtonColour ? 'primary' : 'default' }>
                        <DeleteIcon/>
                    </IconButton>
                }
            </ButtonGroup>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
