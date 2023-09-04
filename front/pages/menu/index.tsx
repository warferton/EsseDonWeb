import Head from 'next/head';
import { useEffect } from 'react';
import { Menu } from '../../components/menu/menu.component';

export default function MenuPage() {
  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "menu");
  })

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

        <Menu />

    </>
  )
}
