import { SetStateAction, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMoreTwoTone, LocalBar, RestaurantSharp } from '@material-ui/icons';
import {
      Container,
      Accordion,       
      AccordionDetails, 
      AccordionSummary,     
      Typography,         
} from '@material-ui/core';


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


export function MenuAccordion() {

  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel : SetStateAction<string>) => (event: any, isExpanded : boolean) => {
    setExpanded(isExpanded ? panel : null);
  };


    return(
    <Container className={ classes.root }>
          
        <Accordion expanded={ expanded === 'drinks' } onChange={ handleChange('drinks') }>
          <AccordionSummary
            expandIcon={ <ExpandMoreTwoTone fontSize='large'/> }
            aria-controls="drinks-content"
            id="drinks-header"
          >
            <LocalBar className={ classes.icon }/>
            <Typography variant='h3' className={ classes.heading }>
              Бар
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={ expanded === 'food' } onChange={ handleChange('food') }>
          <AccordionSummary
            expandIcon={ <ExpandMoreTwoTone fontSize='large'/> }
            aria-controls="food-content"
            id="food-header"
          >
            <RestaurantSharp className={ classes.icon }/>
            <Typography variant='h3' className={ classes.heading }>
              Кухня
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
    </Container>
    )
}