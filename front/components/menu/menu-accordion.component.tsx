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
      TypographyProps,         
} from '@material-ui/core';


interface IProps{
    title: string;
    titleVariant?: TypographyProps['variant'];
    titleStyle?: Object;
    expanded?: boolean;
    children?: any;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    onChange?: AccordionProps["onChange"];
    className?: string;
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

    const { 
      className, 
      titleVariant, 
      titleStyle, 
      title, 
      expanded, 
      icon: Icon, 
      children, 
      onChange, 
    } = props
    
    const classes = useStyles();

    return(
            
        <Accordion 
        expanded={ expanded } 
        onChange={ onChange } 
        TransitionProps={{ unmountOnExit: true }} 
        className={ className }>
            <AccordionSummary
                expandIcon={ <ExpandMoreTwoTone fontSize='large'/> }
                aria-controls="drinks-content"
                id="drinks-header"
            >
                {Icon && <Icon className={ classes.icon }/>}
                <Typography variant={ titleVariant } className={ classes.heading } style={ titleStyle }>
                    
                    { title }

                </Typography>
            </AccordionSummary>
            <AccordionDetails classes={ classes }>

                { children || null }

            </AccordionDetails>
        </Accordion>

    )}