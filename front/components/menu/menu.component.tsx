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
  
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel : SetStateAction<string>) => (event: ChangeEvent<{}>, isExpanded : boolean) => {
    setExpanded(isExpanded ? panel : null);
  };


  return(
    <Container classes={ classes }>
      <MenuAccordion 
        title="Бар"
        titleVariant="h5"
        expanded={ expanded === 'bar' } 
        icon={ LocalBar }
        onChange={ handleChange('bar') } 
        >
          {
            barItems.map((group : IMenuItemGroup) => {
              return(
                <MenuSection title={ group.name } key={ group.name }>
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
        titleVariant="h5"
        expanded={ expanded === 'kitchen' } 
        icon={ RestaurantSharp }
        onChange={ handleChange('kitchen') } 
        >
          {
            kitchenItems.map((group : IMenuItemGroup) => {
              return(
                <MenuSection title={ group.name } key={ group.name }>
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
<<<<<<< HEAD
=======
    
   {/* <MenuAccordion
        title="Специальное Меню"
        expanded={ expanded === 'special' } 
        icon={ Star }
        onChange={ handleChange('special') } 
        >
          {
            specialItems.map((group : IMenuItemGroup) => {
              return(
                <MenuSection title={ group.name } key={ group.name }>
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
        title="Вегитарианское Меню"
        expanded={ expanded === 'vegan' } 
        icon={ Favorite }
        onChange={ handleChange('vegan') } 
        >
          {
            veganItems.map((group : IMenuItemGroup) => {
              return(
                <MenuSection title={ group.name } key={ group.name }>
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
      </MenuAccordion> */}
>>>>>>> 843ded7e487c5989466f32771179336741a35112

    </Container>
  )
}
