import Head from 'next/head';
/*import { Menu } from '../../components/menu/menu.component';*/
//import { fetchMenuItems } from '../../utils/api-utils';
//import { parseMenuItems } from '../../utils/parsing-utils';
import { IMenuItemGroup } from '../../types/menu/menuItem.type';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { MenuCard } from '../../components/cards/menuCard.component';
import { CardSlider } from '../../components/cards/slider/card-slider.component';
import { Typography, ImageList, ImageListItem, makeStyles } from '@material-ui/core';


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


interface IProps{
  barItems : IMenuItemGroup[];
  kitchenItems : IMenuItemGroup[];
  specialItems : IMenuItemGroup[];
  wineItems : IMenuItemGroup[];
}

const menuImages = [
    {
        title: "Бизнес ланч",
        image: 'images/menu/menu lunch.jpg',
    },
    {
      title: "Кухня",
      image: 'images/menu/menu company.jpg',
    },
    {
        title: "Бар: чай и кофе",
        image: 'images/menu/menu bar1.jpg',
    },
    {
        title: "Бар: пиво и коктейли",
        image: 'images/menu/menu bar2.jpg',
    },
    {
        title: "Бар: крепкие напитки",
        image: 'images/menu/menu bar3.jpg',
    },
    {
        title: "Винная карта",
        image: 'images/menu/menu wine.jpg',
    }
];

const menuImages1 = [
  {
    title: "Эспрессо Мартини",
    image: 'images/image-menu-1-1.jpeg',
    price: ""
  },
  {
    title: "Негрони",
    image: 'images/image-menu-1-2.jpeg',
    price: ""
  },
  {
    title: "Маргарита классическая",
    image: 'images/image-menu-1-3.jpeg',
    price: ""
  },
  {
    title: "Нью_Йорк Сауэр",
    image: 'images/image-menu-1-4.jpeg',
    price: ""
  },
  {
    title: "Смузи малина_кокос",
    image: 'images/image-menu-1-5.jpeg',
    price: ""
  },
  {
    title: "Смузи клубничный с апельсином",
    image: 'images/image-menu-1-6.jpeg',
    price: ""
  },
  {
    title: "Черничный смузи",
    image: 'images/image-menu-1-7.jpeg',
    price: ""
  },
  {
    title: "Лимонад Тархун",
    image: 'images/image-menu-1-8.jpeg',
    price: ""
  },
  {
    title: "Тропический Лимонад",
    image: 'images/image-menu-1-9.jpeg',
    price: ""
  },
  {
    title: "Лимонад малина_имбриь",
    image: 'images/image-menu-1-10.jpeg',
    price: ""
  },
];

const menuImages2 = [
  {
    title:"Салат с кальмаром, снежным крабом и огурцом",
    image:'images/menu2/image-menu 2.jpg',
    price: ""
  },
  {
    title: "Салат с креветками и гуакамоле",
    image: 'images/menu2/image-menu 1.jpg',
    price: ""
  },
  {
    title: "Стейк_салат с томатами пряным соусом",
    image: 'images/menu2/image-menu 3.jpg',
    price: ""
  },
  {
    title: "Тапас с гуакамоле и креветками",
    image: 'images/menu2/image-menu 4.jpg',
    price: ""
  },
  {
    title: "Тапас с бабаганушем и тапенадом из маслин",
    image: 'images/menu2/image-menu 5.jpg',
    price: ""
  },
  {
    title: "Крем суп из батата с кокосовой пенкой с креветками",
    image: 'images/menu2/image-menu 6.jpg',
    price: ""
  },
  {
    title: "Гаспачо с творожным зерном и свежим огурцом",
    image: 'images/menu2/image-menu 7.jpg',
    price: ""
  },
  {
    title: "Утиная грудка с сырным орзо",
    image: 'images/menu2/image-menu 8.jpg',
    price: ""
  },
  {
    title: "Баранина томленая с полбой, грибами и облепихой",
    image: 'images/menu2/image-menu 9.jpg',
    price: ""
  },
  {
    title: "Ассорти фирменных дипов",
    image: 'images/menu2/image-menu 10.jpg',
    price: ""
  },
  {
    title: "Лосось с гуакомоле",
    image: 'images/menu2/image-menu 11.jpg',
    price: ""
  },
  {
    title: "Деревенская пицца с тапенадом из маслин и трюфеля",
    image: 'images/menu2/image-menu 12.jpg',
    price: ""
  },
  {
    title: "Крем_Брюле с манговым сорбетом",
    image: 'images/menu2/image-menu 13.jpg',
    price: ""
  },
  {
    title: "Айс_десерт клубника/личи",
    image: 'images/menu2/image-menu 14.jpg',
    price: ""
  }
];

export default function MenuPage(props : IProps) {

  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "menu");
  })

  const animVariants = {
    hidden: { opacity: 0.4, y: 300, x: 0 },
    enter: { opacity: 1, y: 0, x: 0 },
    exit: { opacity: 0 , y: 100, x: 0 },
  }

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Меню Ресторана</title>
        <meta name="description" content="Джаз-Клуб ЭССЕ. Меню Ресторана" />
        <link rel="canonical" href="https://essedon.ru/menu"/>
        <meta name="theme-color" content="#1a1a1a"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <motion.main
          style={{ minHeight: '75vh' }}
          variants={ animVariants }
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: 'spring', damping: 15, bounce: 0.50 }}
      >

	    <Typography variant='h5' style={{ paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'}}>
        Напитки
      </Typography>

      <CardSlider>
        {menuImages1.map((item) => (

          <MenuCard image={ item.image } title={ item.title } price={ item.price }></MenuCard>
        
        ))}
      </CardSlider>

      <Typography variant='h5' style={{ paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'}}>
        Кухня
      </Typography>

      <CardSlider>
        {menuImages2.map((item) => (

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
              {menuImages.map((item) => (
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
        {/*<Menu items={ props }/>*/}
      </motion.main>
    </>
  )
}
