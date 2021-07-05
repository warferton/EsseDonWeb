import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMoreTwoTone } from '@material-ui/icons';
import {
      Accordion,       
      AccordionDetails, 
      AccordionProps, 
      AccordionSummary,     
      SvgIconTypeMap,     
      Typography,         
} from '@material-ui/core';


interface IProps{
    title: string;
    expanded?: boolean;
    children?: any;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    onChange?: AccordionProps["onChange"];
}

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: 'auto'
  },
  icon: {
    fontSize: '40px'
  },
  root: {
    display: 'block',
    padding: 0
  }
}));


export function MenuAccordion(props : IProps) {

    const { title, expanded, icon: Icon, children, onChange } = props
    
    const classes = useStyles();

    return(
            
        <Accordion expanded={ expanded } onChange={ onChange } TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
                expandIcon={ <ExpandMoreTwoTone fontSize='large'/> }
                aria-controls="drinks-content"
                id="drinks-header"
            >
                <Icon className={ classes.icon }/>
                <Typography variant='h4' className={ classes.heading }>
                    
                    { title }

                </Typography>
            </AccordionSummary>
            <AccordionDetails classes={ classes }>

                { children }

            </AccordionDetails>
        </Accordion>

    )}