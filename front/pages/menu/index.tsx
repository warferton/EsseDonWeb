import Head from 'next/head';
import { Menu } from '../../components/menu/menu.component';
import { fetchMenuItems } from '../../utils/api-utils';
import { parseMenuItems } from '../../utils/parsing-utils';
import { IMenuItemGroup } from '../../types/menu/menuItem.type';
import { motion } from 'framer-motion';
import { useEffect } from 'react';


interface IProps{
  barItems : IMenuItemGroup[];
  kitchenItems : IMenuItemGroup[];
  specialItems : IMenuItemGroup[];
  veganItems : IMenuItemGroup[];
}

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

        <Menu items={ props }/>
      </motion.main>
    </>
  )
}

export const getServerSideProps = async () => {
  const rawBarData = await fetchMenuItems('bar');
  const rawKitchenData = await fetchMenuItems('kitchen');
  // const rawSpecialData = await fetchMenuItems('special');
  // const rawVeganData = await fetchMenuItems('vegan');

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
  // const parsedVeganData = parseMenuItems(rawVeganData);

  return {
    props:{
      barItems: parsedBarData,
      kitchenItems: parsedKitchenData,
      // specialItems: parsedSpecialData,
      // veganItems: parsedVeganData
    }
  }

}
