import { SetStateAction, useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LocalBar, RestaurantSharp } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import { MenuAccordion } from './menu-accordion.component';
import { MenuSection } from './menu-section.component';
import { MenuItem } from './menu-food-item.component';
import { IMenuItem, IMenuItemGroup } from '../../types/menu/menuItem.type';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    width: '95%',
  }
}));


interface IProps{
  items: {
    barItems : IMenuItemGroup[];
    kitchenItems : IMenuItemGroup[];
  }
}

export function Menu({ items } : IProps ) {
  
  const classes = useStyles();

  const { barItems, kitchenItems } = items;

  console.log(`inisde Menu:  ${ items }`);
  

  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel : SetStateAction<string>) => (event: ChangeEvent<{}>, isExpanded : boolean) => {
    setExpanded(isExpanded ? panel : null);
  };


  return(
    <Container classes={ classes }>
      <MenuAccordion 
        title="Бар"
        expanded={ expanded === 'bar' } 
        icon={ LocalBar }
        onChange={ handleChange('bar') } 
        >
          {
            barItems.map((group : IMenuItemGroup) => {
              return(
                <MenuSection title={ group.name }>
                  {
                    group.items.map((item : IMenuItem) => {
                      return(
                        <MenuItem 
                        key={ item._id } 
                        title={ item.title } 
                        price={ item.price } 
                        description={ item.description }
                        />
                      );
                    })
                  }
                </MenuSection>
              );
            })

          }
      </MenuAccordion>

      <MenuAccordion 
        title="Кухня"
        expanded={ expanded === 'kitchen' } 
        icon={ RestaurantSharp }
        onChange={ handleChange('kitchen') } 
        >
          {
            kitchenItems.map((group : IMenuItemGroup) => {
              return(
                <MenuSection title={ group.name }>
                  {
                    group.items.map((item : IMenuItem) => {
                      return(
                        <MenuItem 
                        key={ item._id } 
                        title={ item.title } 
                        price={ item.price } 
                        description={ item.description }
                        />
                      );
                    })
                  }
                </MenuSection>
              );
            })
          }
      </MenuAccordion>
    </Container>
  )
}