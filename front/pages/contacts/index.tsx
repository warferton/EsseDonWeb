import Head from 'next/head';
import { useEffect } from 'react';
import { AboutContact } from '../../components/contact-page-components/about.component';
import { ArtistForm } from '../../components/contact-page-components/artist-form.component';
import { MapBox } from '../../components/contact-page-components/map.component';
import { Footer } from '../../components/footer/footer.component';

export default function ContactsPage() {

  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "contacts");
  })
  

  return (
    <>
      <Head>
        <title>Контакты</title>
        <meta name="description" content="Контакты джаз клуба ЭССЕ г. Ростов-на-Дону" />
        <link rel="canonical" href="https://essedon.ru/contacts"/>
        <meta name="theme-color" content="#1a1a1a"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json"/>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <MapBox/>

      <AboutContact/>

      <ArtistForm/>

      <Footer position='static'/>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 21600
  }
 }

