import { useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Folder from '@material-ui/icons/FolderRounded';
import Language from '@material-ui/icons/Language';
import Settings from '@material-ui/icons/Settings';
import Backup from '@material-ui/icons/Backup';

interface ICheckboxProps {
    value: string | number;
    id: string;
    checked?: boolean;

}

export function EventListItemChecbox(props : ICheckboxProps) {

    const { value, id, checked: mark } = props; 

    const [checked, setChecked] = useState(mark);

    const handleToggle = () => () => {
        setChecked(!checked);
    };


    return(
         <ListItem key={value} button>
            <ListItemText id={ id } primary={`Line item ${value}`} />
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



interface IButtonsProps {
    value: string | number;
    id: string;
    checked?: boolean;
    published: boolean;

}

export function EventListItemButtons(props : IButtonsProps) {

    const { value, id, published } = props; 

    return(
         <ListItem key={value} button>
            <ListItemText id={ id } primary={`Line item ${value}`} />
            <ListItemSecondaryAction>
            <ButtonGroup>
                <IconButton>
                    {published ?  <Settings/> : <Folder/>}
                </IconButton>
                <IconButton>
                    {published ?   <Backup/> : <Language/> }
                </IconButton>
            </ButtonGroup>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
