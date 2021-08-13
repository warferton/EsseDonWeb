import { makeStyles } from '@material-ui/core/styles';
import { ExpandLessRounded } from '@material-ui/icons';
import {
      Accordion,       
      AccordionDetails, 
      AccordionProps, 
      AccordionSummary,     
      Typography,         
} from '@material-ui/core';


interface IProps{
    title: string;
    children?: any;
    onChange?: AccordionProps["onChange"];
}

const useStyles = makeStyles((theme) => ({  
  root: {
    margin: "0px",
    width: '100%',
    display: 'block',
    padding: 0
  },
  heading: {
    margin: 'auto'
  },
  summary: {
      transition: '0.3s ease-out',
  },
  highlighted: {
      backgroundImage: 'conic-gradient(from 45grad at 5% -3%,#ff0000,50grad,#7b64ff) !important'
  },
  contentBody: {
      flexDirection: 'column',
  },
}));


export function MenuSection(props : IProps) {

    const { title, children, onChange } = props
    
    const classes = useStyles();

    return(
            
        <Accordion onChange={ onChange } TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
                expandIcon={ <ExpandLessRounded/> }
                aria-controls="drinks-content"
                id="section"
            >

                <Typography variant='h5' className={ classes.heading }>

                { title }

                </Typography>

            </AccordionSummary>
            <AccordionDetails className={ classes.contentBody }>
                
                { children }

            </AccordionDetails>
        </Accordion>
    )}
