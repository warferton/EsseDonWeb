import { Dispatch, useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArchiveIcon from '@material-ui/icons/Archive';
import Settings from '@material-ui/icons/Settings';
import Backup from '@material-ui/icons/Backup';
import { IEvent } from '../../../types/event/event.type';


interface ISelectorProps {
    event: IEvent;
    id: string;
}

export function EventListItemSelector(props : ISelectorProps) {

    const { event, id } = props; 

    const initialGroup = event.group;

    let isGroupChanged = false;

    const [group, setGroup] = useState( event.group );

    const handleChangeGroup = (changeEvent: React.ChangeEvent<{ value: string }>) => {
        const newGroup = changeEvent.target.value;
        isGroupChanged = initialGroup !== newGroup ? true : false;
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
    id: string;
    handleOpen: Dispatch<any>;
}

export function EventListItemButtons(props : IButtonsProps) {

    const { event, id, handleOpen } = props; 

    const { active } = event;

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
                <IconButton>
                    {active ? <ArchiveIcon/> : <Backup/>}
                </IconButton>
            </ButtonGroup>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
