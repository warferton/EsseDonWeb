import { Dispatch, useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArchiveIcon from '@material-ui/icons/Archive';
import Settings from '@material-ui/icons/Settings';
import Backup from '@material-ui/icons/Backup';
import { IEvent } from '../../../types/event/event.type';

interface ICheckboxProps {
    event: IEvent;
    id: string;
    checked?: boolean;
}

export function EventListItemChecbox(props : ICheckboxProps) {

    const { event, id, checked } = props; 

    const [checked, setChecked] = useState(checked);

    const handleToggle = () => () => {
        setChecked(!checked);
    };


    return(
         <ListItem key={ event._id } button>
            <ListItemText id={ id } primary={ event.title } />
            <ListItemSecondaryAction>
            <Checkbox
                edge="end"
                onChange={handleToggle()}
                checked={checked}
                inputProps={{ 'aria-labelledby': id }}
            />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

//================================================================
//================================================================

interface IButtonsProps {
    event: IEvent;
    id: string;
    checked?: boolean;
    handleOpen: Dispatch<any>;
}

export function EventListItemButtons(props : IButtonsProps) {

    const { event, id, published, handleOpen } = props; 

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
                    { event.active ? <ArchiveIcon/> : <Backup/> }
                </IconButton>
            </ButtonGroup>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
