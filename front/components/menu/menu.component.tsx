import { MenuCard } from '../../components/cards/menuCard.component';
import { CardSlider } from '../../components/cards/slider/card-slider.component';
import { Typography, ImageList, ImageListItem, makeStyles } from '@material-ui/core';

import kitchenMenu from './menu-data/kitchen.json';
import drinksMenu from './menu-data/drinks.json';
import fullMenu from './menu-data/full-menu.json';

const useStyles = makeStyles({
  imageList: {
    width: '100%',
    '@media (min-width: 1080px)' : {
      width: '60%'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    paddingTop: '5vh',
    paddingBottom: '5vh'
  }
});

export function Menu() {
  
  const classes = useStyles();

  return(
    <>
      <Typography variant='h5' style={{ paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'}}>
        Напитки
      </Typography>

      <CardSlider>
        {drinksMenu.map((item) => (

          <MenuCard image={ item.image } title={ item.title } price={ item.price }></MenuCard>
        
        ))}
      </CardSlider>

      <Typography variant='h5' style={{ paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'}}>
        Кухня
      </Typography>

      <CardSlider>
        {kitchenMenu.map((item) => (

          <MenuCard image={ item.image } title={ item.title } price={ item.price }></MenuCard>
        
        ))}
      </CardSlider>

      <Typography variant='h4' style={{ 
        fontSize: '24px', 
        fontWeight: 500,
        padding: '0.7rem',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        textAlign: 'center',
        backgroundColor: 'white',
        }}>
                Полное Меню
      </Typography>

      <div className={ classes.container }>
          <ImageList
              className={ classes.imageList }
              cols={1}
              rowHeight={'auto'}
              component={ 'div' }
            >
              {fullMenu.map((item) => (
                <ImageListItem key={item.image}>
                  <img
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item.title}
                    loading="lazy"
                    className={ classes.image }
                  />
                </ImageListItem>
              ))}
            </ImageList>
      </div>
    </>
  )
}
