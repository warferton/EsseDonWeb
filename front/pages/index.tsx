import Head from 'next/head';
import { Container, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllActiveEvents } from '../utils/api-utils';
import { IEvent } from '../types/event/event.type';
import dynamic from 'next/dynamic';

const MainEvents = dynamic(() => import('../components/afisha-components/main-event-stepper'));
const ImportantEvents = dynamic(() => import('../components/afisha-components/important-events'));
const EventsDisplay = dynamic(() => import('../components/afisha-components/events-display'));
const FrontStore = dynamic(() => import('../components/afisha-components/store'));
const Footer = dynamic(() => import('../components/footer/footer.component').then(mod => mod.Footer));


interface IProps {
  mainGroupEvents: IEvent[];
  secondGroupEvents: IEvent[];
  generalGroupEvents: IEvent[];
}

export default function Home({ mainGroupEvents, secondGroupEvents, generalGroupEvents } : IProps) {
  
  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "afisha");
  })

  const animVariants = {
    hidden: { opacity: 0.4, y: 300, x: 0 },
    enter: { opacity: 1, y: 0, x: 0 },
    exit: { opacity: 0 , y: 100, x: 0 },
  }

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
        <motion.main
          variants={ animVariants }
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: 'linear' }}
        >
          <Container className = { styles.body}>

              <MainEvents events={ mainGroupEvents } />

              <ImportantEvents events={ secondGroupEvents } />

              <FrontStore />

              <EventsDisplay events={ generalGroupEvents } />
            
          </Container>
          <Footer position='static'/>
        </motion.main>
    </>

  )
}

export const getServerSideProps = async () => {
  return await fetchAllActiveEvents()
  .then((result) => {
    if(result.generalGroupEvents.length < 1
      && result.secondGroupEvents.length < 1
      && result.mainGroupEvents.length < 1) {
        throw new Error("No Data Recieved From Server")
      }
    return {
        props: { ...result }
    };
  })
  .catch((error) => {
    console.error(error);
    return { 
      redirect: {
        destination: '/fallback/error',
        permanent: false,
      },
    }
  });
}
