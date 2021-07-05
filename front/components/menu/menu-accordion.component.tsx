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
import { OverridableComponent } from '@material-ui/core/OverridableComponent';


interface IProps{
    title: string;
    expanded?: boolean;
    children?: any;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    onChange?: AccordionProps["onChange"];
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    width: '95%',
  },
  heading: {
    margin: 'auto'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    fontSize: '50px'
  }
}));


export function MenuAccordion(props : IProps) {

    const { title, expanded, icon: Icon, children, onChange } = props
    
    const classes = useStyles();

    return(
            
        <Accordion expanded={ expanded } onChange={ onChange }>
            <AccordionSummary
                expandIcon={ <ExpandMoreTwoTone fontSize='large'/> }
                aria-controls="drinks-content"
                id="drinks-header"
            >
                <Icon className={ classes.icon }/>
                <Typography variant='h3' className={ classes.heading }>
                { title }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                
                { children }

            </AccordionDetails>
        </Accordion>
    )}