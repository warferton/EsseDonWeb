import Head from 'next/head';
import { Container, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import {fetchAllActiveImportantEventsWithImage, fetchAllActiveMainEventsWithImage } from '../utils/api-utils';
import { IEvent } from '../types/event/event.type';
import dynamic from 'next/dynamic';

const MainEvents = dynamic(() => import('../components/afisha-components/main-event-stepper')) as (any: any) => any;
const ImportantEvents = dynamic(() => import('../components/afisha-components/important-events')) as (any: any) => any;
const EventsDisplay = dynamic(() => import('../components/afisha-components/events-display')) as (any: any) => any;
const FrontStore = dynamic(() => import('../components/afisha-components/store')) as (any: any) => any;
const Footer = dynamic(() => import('../components/footer/footer.component').then(mod => mod.Footer)) as (any: any) => any;


interface IProps {
  mainEvents: IEvent[];
  importantEvents: IEvent[];
}

export default function Home({ mainEvents, importantEvents } : IProps) {
  
  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "afisha");
  })

  const useStyles = makeStyles({
    body: {
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 0px 15px #11111185',
      '@media (min-width: 684px)': {
        alignItems: 'center',
        maxWidth: '75%',
        marginTop: '0.1rem'
      },
      maxWidth: '100%',
      padding: 0
    },
    heading: {
      marginTop: '1rem',
      padding: '1.3rem',
      paddingLeft: '2rem',
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '10px',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      textAlign: 'center',
      background: 'white',
    }
  });
  
  const styles = useStyles();

  return (
    <>
      <Head>
        <title>Джаз-Клуб Эссе</title>
        <meta name="description" content="Афиша, концерты, мероприятия Джаз-Клуб ЭССЕ, г. Ростов-на-Дону" />
        <link rel="canonical" href="https://essedon.ru"/>
        <meta name="theme-color" content="#1a1a1a"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="apple-touch-icon" href="/favico.png"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Container className = { styles.body}>

            <MainEvents events={ mainEvents } />

            <ImportantEvents events={ importantEvents } />

            <FrontStore />

            <EventsDisplay />
          
        </Container>
        <Footer position='static'/>
    </>

  )
}

export async function getStaticProps() {
  const mainEvents = await fetchAllActiveMainEventsWithImage()
  .then((mainEvents) => {
    return mainEvents
  })
  .catch((error) => {
    console.error(error);
    return [];
  });
  const importantEvents = await fetchAllActiveImportantEventsWithImage()
  .then((importantEvents) => {
    return importantEvents
  })
  .catch((error) => {
    console.error(error);
    return [];
  });

  return {
    props: {
      mainEvents: mainEvents,
      importantEvents: importantEvents
    },
    revalidate: 60
  }
}
