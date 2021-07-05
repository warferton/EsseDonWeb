import { SetStateAction, useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LocalBar, RestaurantSharp } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import { MenuAccordion } from './menu-accordion.component';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    width: '95%',
  }
}));

export function Menu() {

  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel : SetStateAction<string>) => (event: ChangeEvent<{}>, isExpanded : boolean) => {
    setExpanded(isExpanded ? panel : null);
  };


    return(
    <Container className={ classes.root }>
          
        <MenuAccordion 
          title="Бар"
          expanded={ expanded === 'drinks' } 
          icon={ LocalBar }
          onChange={ handleChange('drinks') } 
          >
            
        </MenuAccordion>

        <MenuAccordion 
          title="Кухня"
          expanded={ expanded === 'food' } 
          icon={ RestaurantSharp }
          onChange={ handleChange('food') } 
          >
            
        </MenuAccordion>


    </Container>
    )
}