import Head from 'next/head';
import { LogoHeader } from '../../components/headers/header.compenent';
import { Menu } from '../../components/menu/menu.component';
import { fetchMenuItems } from '../../utils/api-utils';
import { parseMenuItems } from '../../utils/parsing-utils';
import { IMenuItemGroup } from '../../types/menu/menuItem.type';


interface IProps{
  barItems : IMenuItemGroup[];
  kitchenItems : IMenuItemGroup[];
  specialItems : IMenuItemGroup[];
  veganItems : IMenuItemGroup[];
}

export default function MenuPage(props : IProps) {

  return (
    <>
      <Head>
        <title>Меню Ресторана</title>
        <meta name="description" content="Джаз-Клуб ЭССЕ. Меню Ресторана" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoHeader/>

      <Menu items={ props }/>
      
    </>
  )
}

export const getStaticProps = async () => {
  const rawBarData = await fetchMenuItems('bar');
  const rawKitchenData = await fetchMenuItems('kitchen');
  const rawSpecialData = await fetchMenuItems('special');
  const rawVeganData = await fetchMenuItems('vegan');

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
  const parsedSpecialData = parseMenuItems(rawSpecialData);
  const parsedVeganData = parseMenuItems(rawVeganData);

  return {
    props:{
      barItems: parsedBarData,
      kitchenItems: parsedKitchenData,
      specialItems: parsedSpecialData,
      veganItems: parsedVeganData
    }
  }

}
