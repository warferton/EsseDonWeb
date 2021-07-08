import { useState } from'react';
import { 
    Box,
    Button,
    Typography, 
    List, 
    ListItem, 
    ListItemSecondaryAction, 
    Checkbox, 
    ListItemText,
    makeStyles
} from '@material-ui/core'
import { SaveOutlined as SaveIcon } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'white'
    },
    buttonBox: {
        padding: '10px'
    },
    saveButton: {
        backgroundImage: 'conic-gradient(from 45grad at 5% -3%,#ff0000,50grad,#7b64ff)',
        color: 'white',
    }
});


export function EventController() {

    const classes = useStyles();
    const [checked, setChecked] = useState([1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };



    return(
        <>
            <List dense className={classes.root}>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                    <ListItem key={value} button>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                        </ListItemSecondaryAction>
                    </ListItem>
                    );
                })}
            </List>
            <Box className={ classes.buttonBox }>
                <Button 
                fullWidth
                endIcon={ <SaveIcon/> } 
                className={ classes.saveButton }>
                    <Typography>
                        Save
                    </Typography>
                </Button>
            </Box>
        </>

    );
}