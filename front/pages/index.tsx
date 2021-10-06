import Head from 'next/head';
import { makeStyles } from '@material-ui/core';
import { CardSlider } from '../components/cards/slider/card-slider.component';
import { LogoHeader } from '../components/headers/header.compenent';
import { Footer } from '../components/footer/footer.component';
import { BigEventCard } from '../components/cards/bigCard.component';
import { EventCard } from '../components/cards/card.component';
import { SmallEventCard } from '../components/cards/smallCard.component';
import{ SwipeableStepper } from '../components/cards/carousel/carousel.component';
import { NavigationFab } from '../components/navigation/navigation-fab.component'
import { IEvent } from '../types/event/event.type';
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { fetchAllActiveEvents } from '../utils/api-utils';


const useStyles = makeStyles({
  heading: {
    fontSize: '20px',
    fontWeight: 600,
    paddingTop: '2rem',
    paddingLeft: '1rem',
    lineHeight: '10px',
  },
  generalEvents: {
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoRows: 'auto',
    gridGap: '0.5rem',
    '@media (max-width: 1240px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }
  }
});

interface IProps {
  mainGroupEvents: IEvent[];
  secondGroupEvents: IEvent[];
  generalGroupEvents: IEvent[];
}

export default function Home({ mainGroupEvents, secondGroupEvents, generalGroupEvents } : IProps) {
  
  const styles = useStyles();

  return (
    <>
      <Head>
        <title>Эссе-Дон</title>
        <meta name="description" content="Джаз-Клуб ЭССЕ, г. Ростов-на-Дону" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoHeader/>

        <>
          <NavigationFab>
            <SwipeableStepper>
              { 
                mainGroupEvents.map((event : IEvent) => 

                  <BigEventCard key={ event._id } event={ event }/>

                )
              }
            </SwipeableStepper>

            { secondGroupEvents.length > 0 &&
              <Typography className = { styles.heading }>
                Лучшее на этой неделе
              </Typography>
            }
            
            <CardSlider>
              { secondGroupEvents.map((event : IEvent)=> 
            
                  <SmallEventCard key={ event._id } event={ event }/>

                )
              }
            </CardSlider>

            <Divider variant='fullWidth' orientation='horizontal' style={{ height: '5px', boxShadow: '0px 7px 5px #00000055' }}/>

            <Container className={ styles.generalEvents }>
              { generalGroupEvents.map((event : IEvent) => 
              
                  <EventCard key={ event._id } event={ event }/>

                )
              }
            </Container>
          </NavigationFab>
          <Footer position='static'/>
        </>
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
//testing