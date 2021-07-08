import { SetStateAction, useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LocalBar, RestaurantSharp } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import { MenuAccordion } from './menu-accordion.component';
import { MenuSection } from './menu-section.component';
import { MenuItem } from './menu-food-item.component';

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
      <Container classes={ classes }>
            
          <MenuAccordion 
            title="Бар"
            expanded={ expanded === 'drinks' } 
            icon={ LocalBar }
            onChange={ handleChange('drinks') } 
            >
              <MenuSection title='Винная Карта'>

                 <MenuItem title='MOET XYU' price={ 8000 } description='Ревльно моет'/>

              </MenuSection>

              <MenuSection title='He Винная Карта'>

                 <MenuItem title='HE MOET XYU' price={ 14104 } description='Ревльно He моет'/>

              </MenuSection>

          </MenuAccordion>

          <MenuAccordion 
            title="Кухня"
            expanded={ expanded === 'food' } 
            icon={ RestaurantSharp }
            onChange={ handleChange('food') } 
            >
              <MenuSection title='Горячие Блюда'>

                <MenuItem title='MOET XYU' price={ 8000 } description='Ревльно моет'/>

              </MenuSection>

              <MenuSection title='He Горячие Блюда'>

                <MenuItem title='HE MOET XYU' price={ 1000 } description='Ревльно He моет'/>

              </MenuSection>

          </MenuAccordion>


      </Container>
    )
}