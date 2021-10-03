import Head from 'next/head';
import { LogoHeader } from '../../components/headers/header.compenent';
import { Menu } from '../../components/menu/menu.component';
import { fetchBarItems, fetchKitchenItems } from '../../utils/api-utils';
import { parseMenuItems } from '../../utils/parsing-utils';
import { IMenuItemGroup } from '../../types/menu/menuItem.type';
import { NavigationFab } from '../../components/navigation/navigation-fab.component';
import { Footer } from '../../components/footer/footer.component';


interface IProps{
  barItems : IMenuItemGroup[];
  kitchenItems : IMenuItemGroup[];
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

      <NavigationFab/>

      <Footer position='static'/>
      
    </>
  )
}

export const getStaticProps = async () => {
  const rawBarData = await fetchBarItems();
  const rawKitchenData = await fetchKitchenItems();

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

  return {
    props:{
      barItems: parsedBarData,
      kitchenItems: parsedKitchenData,
    }
  }

}