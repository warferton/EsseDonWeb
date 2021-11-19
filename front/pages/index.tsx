import Head from 'next/head';
import { makeStyles } from '@material-ui/core';
import { CardSlider } from '../components/cards/slider/card-slider.component';
import { Footer } from '../components/footer/footer.component';
import { BigEventCard } from '../components/cards/bigCard.component';
import { EventCard } from '../components/cards/card.component';
import { SmallEventCard } from '../components/cards/smallCard.component';
import{ SwipeableStepper } from '../components/cards/carousel/carousel.component';
import { IEvent } from '../types/event/event.type';
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { fetchAllActiveEvents } from '../utils/api-utils';
import { motion } from 'framer-motion';
import { useEffect } from 'react';


interface IProps {
  mainGroupEvents: IEvent[];
  secondGroupEvents: IEvent[];
  generalGroupEvents: IEvent[];
}

export default function Home({ mainGroupEvents, secondGroupEvents, generalGroupEvents } : IProps) {
  
  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "afisha");
  })

  const gridColumns = generalGroupEvents.length < 2 ? 1 : generalGroupEvents.length < 3 ? 2 : 3;

  const animVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const useStyles = makeStyles({
  body: {
    backgroundColor: '#FFFFFF'
  },
  heading: {
    marginTop: '1rem',
    padding: '1.3rem',
    paddingLeft: '2rem',
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '10px',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    backgroundColor: 'white',
  },
  generalEvents: {
    display: 'grid',
    justifyContent: 'space-between',
    justifyItems: 'center',
    gridTemplateColumns: `repeat(${ gridColumns }, 1fr)`,
    gridAutoRows: 'auto',
    gridGap: '0.5rem',
    '@media (max-width: 1240px)': {
      display: 'grid',
      justifyContent: 'space-between',
      justifyItems: 'center',
      gridTemplateColumns: `repeat( 2, 1fr)`,
    },
    '@media (max-width: 875px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }
  }
});
  
  const styles = useStyles();

  return (
    <>
      <Head>
        <title>Эссе-Дон</title>
        <meta name="description" content="Джаз-Клуб ЭССЕ, г. Ростов-на-Дону" />
         <link rel="canonical" href="https://esse-jazz-don.ru"/>
        <meta name="theme-color" content="#1a1a1a"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="apple-touch-icon" href="/favico.png"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <motion.main
          className={ styles.body }
          variants={ animVariants }
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: 'linear' }}
        >
            <SwipeableStepper>
              { 
                mainGroupEvents.map((event : IEvent) => 

                  <BigEventCard key={ event._id } event={ event }/>

                )
              }
            </SwipeableStepper>

            { secondGroupEvents.length > 0 &&
              <Typography variant='h5' className = { styles.heading }>
                В ближайшие дни
              </Typography>
            }
            
            <CardSlider>
              { secondGroupEvents.map((event : IEvent)=> 
            
                  <SmallEventCard key={ event._id } event={ event }/>

                )
              }
            </CardSlider>

            { generalGroupEvents.length > 0 &&
              <Typography variant='h5' className = { styles.heading }>
                Мероприятия в этом месяце
              </Typography>
            }

            <Container className={ styles.generalEvents }>
              { generalGroupEvents.map((event : IEvent) => 
              
                  <EventCard key={ event._id } event={ event }/>

                )
              }
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
