import { 
    Box,
    Button,
    Typography, 
    List, 
    makeStyles
} from '@material-ui/core'
import { SaveOutlined as SaveIcon } from '@material-ui/icons';
import { Dispatch } from 'react';
import { IEvent } from '../../../types/event/event.type';
 

interface IChild{
    event: IEvent;
    published?: boolean;
}

interface IProps{
    active?: boolean;
    childWrapper: any;
    children?: any;
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

    const { active, childWrapper: Wrapper, children, controlFunction } = props

    const classes = useStyles();

    return(
        <>
        {active && 
        (   
            <>
            <List dense className={classes.root}>
                { children.map( (child: IChild) => {
                    const labelId = `checkbox-list-secondary-label-${child?.event.title}`;
                    
                    return (
                        <Wrapper 
                        key={ child.event._id }
                        event={ child.event }
                        id={ labelId } 
                        handleOpen={ controlFunction } 
                        />
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
        )}
        </>

    );
}