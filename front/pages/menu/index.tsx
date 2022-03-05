import Head from 'next/head';
import { Menu } from '../../components/menu/menu.component';
import { fetchMenuItems } from '../../utils/api-utils';
import { parseMenuItems } from '../../utils/parsing-utils';
import { IMenuItemGroup } from '../../types/menu/menuItem.type';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { MenuCard } from '../../components/cards/menuCard.component';
import { CardSlider } from '../../components/cards/slider/card-slider.component';
import { Typography } from '@material-ui/core';

interface IProps{
  barItems : IMenuItemGroup[];
  kitchenItems : IMenuItemGroup[];
  specialItems : IMenuItemGroup[];
  wineItems : IMenuItemGroup[];
}

const menuImages1 = [
  {
    title: "Эспрессо Мартини",
    image: 'images/image-menu-1-1.jpeg',
  },
  {
    title: "Негрони",
    image: 'images/image-menu-1-2.jpeg',
  },
  {
    title: "Маргарита классическая",
    image: 'images/image-menu-1-3.jpeg',
  },
  {
    title: "Нью_Йорк Сауэр",
    image: 'images/image-menu-1-4.jpeg',
  },
  {
    title: "Смузи малина-кокос",
    image: 'images/image-menu-1-5.jpeg',
  },
  {
    title: "Смузи клубничный с апельсином",
    image: 'images/image-menu-1-6.jpeg',
  },
  {
    title: "Черничный смузи",
    image: 'images/image-menu-1-7.jpeg',
  },
  {
    title: "Лимонад Тархун",
    image: 'images/image-menu-1-8.jpeg',
  },
  {
    title: "Тропический Лимонад",
    image: 'images/image-menu-1-9.jpeg',
  },
  {
    title: "Лимонад малина_имбриь",
    image: 'images/image-menu-1-10.jpeg',
  },
];

const menuImages2 = [
  {
    title: "Пицца САЛМОНЕ",
    image: 'images/image-menu-2-1.jpeg',
  },
  {
    title: "ПАСТА С ЧЕРНИЛАМИ КАРАКАТИЦЫ",
    image: 'images/image-menu-2-2.jpeg',
  },
  {
    title: "Дессерты Пти Фуры",
    image: 'images/image-menu-2-3.jpeg',
  },
  {
    title: "МУСС из белого  шоколада",
    image: 'images/image-menu-2-4.jpeg',
  },
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

          <MenuCard image={ item.image } title={ item.title }></MenuCard>
        
        ))}
      </CardSlider>

      <Typography variant='h5' style={{ paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'}}>
        Кухня
      </Typography>

      <CardSlider>
        {menuImages2.map((item) => (

          <MenuCard image={ item.image } title={ item.title }></MenuCard>
        
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

        <Menu items={ props }/>
      </motion.main>
    </>
  )
}

export const getServerSideProps = async () => {
  const rawBarData = await fetchMenuItems('bar');
  const rawKitchenData = await fetchMenuItems('kitchen');
  // const rawSpecialData = await fetchMenuItems('special');
  const rawWineData = await fetchMenuItems('wine');

  if(rawBarData.length < 1 &&
      rawKitchenData.length < 1) {
        return { 
          redirect: {
            destination: '/fallback/error',
            permanent: false,
        },
      }
   }

  const parsedBarData = parseMenuItems(rawBarData);
  const parsedKitchenData = parseMenuItems(rawKitchenData);
  // const parsedSpecialData = parseMenuItems(rawSpecialData);
  const parsedWineData = parseMenuItems(rawWineData);

  return {
    props:{
      barItems: parsedBarData,
      kitchenItems: parsedKitchenData,
      // specialItems: parsedSpecialData,
      wineItems: parsedWineData
    }
  }

}
