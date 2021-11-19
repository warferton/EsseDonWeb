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
        <meta name="description" content="Generated by create next app" />
        <meta name="theme-color" content="#1a1a1a"/>
        <link rel="icon" href="/favicon.ico" />
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
  }
 }

