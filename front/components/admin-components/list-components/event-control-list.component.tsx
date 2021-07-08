import { 
    Box,
    Button,
    Typography, 
    List, 
    makeStyles
} from '@material-ui/core'
import { SaveOutlined as SaveIcon } from '@material-ui/icons';
 


interface IProps{
    active?: boolean;
    childWrapper: any;
    children?: any;
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
});


export function EventControlList(props : IProps) {

    const { active, childWrapper: Wrapper, children } = props

    const classes = useStyles();

    return(
        <>
        {active && 
        (   
            <>
            <List dense className={classes.root}>
                { children.map( (child: any) => {
                    const labelId = `checkbox-list-secondary-label-${child.value}`;
                    return (
                        <Wrapper value={ child.value } id={ labelId } published={ child.published }/>
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