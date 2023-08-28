import Head from 'next/head';
import { makeStyles, Box } from '@material-ui/core';
import { CardSlider } from '../components/cards/slider/card-slider.component';
import { Footer } from '../components/footer/footer.component';
import { BigEventCard } from '../components/cards/bigCard.component';
import { EventCard } from '../components/cards/card.component';
import { SmallEventCard } from '../components/cards/smallCard.component';
import { SwipeableStepper } from '../components/cards/carousel/carousel.component';
import { MenuCard } from '../components/cards/menuCard.component';
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

const storeItems = [
  {
      title: "сертификат",
      image: 'images/shop/сертификаты.jpg',
      price: "3000/5000"
  },
  {
  title: "календарь",
  image: 'images/shop/календарь.jpg',
  price: "850"
  },
  {
    title: "ежедневник",
    image: 'images/shop/ежедневник.jpg',
    price: 1100
  },
  {
    title: "блокнот",
    image: 'images/shop/блокнот.jpg',
    price: 400
  },
  {
    title: "Фирменная сумка",
    image: 'images/shop/сумка.jpg',
    price: 1100
  },
  {
    title: "футболка",
    image: 'images/shop/футболка.jpg',
    price: 850
  },
  {
    title: "браслет",
    image: 'images/shop/браслет.jpg',
    price: 80
  },
  {
    title: "стикеры",
    image: 'images/shop/стикеры.jpg',
    price: 150
  },
  {
    title: "термокружка",
    image: 'images/shop/термокружка.jpg',
    price: 600
  },
  {
    title: "бирка",
    image: 'images/shop/бирка.jpg',
    price: 120
  },
  {
    title: "Книга К. Мошкова",
    image: 'images/shop/великие люди джаза.jpg',
    price: 3300
  },
  {
    title: "Книга К.Мошкова",
    image: 'images/shop/российский джаз.jpg',
    price: 2100
  },
  {
    title: "К. Мошков ”Блюз. Введение в историю”",
    image: 'images/shop/блюз.jpg',
    price: 1200
  },
  {
    title: "книга В. Фейертага",
    image: 'images/shop/фейертаг.jpg',
    price: 750
  },
  {
    title: "книга Л. Переверзева",
    image: 'images/shop/элингтону.jpg',
    price: 900
  },
  {
    title: "Джаз. Введение в стилистику",
    image: 'images/shop/столяр.jpg',
    price: 750
  }
];

export default function Home({ mainGroupEvents, secondGroupEvents, generalGroupEvents } : IProps) {
  
  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "afisha");
  })

  const gridColumns = generalGroupEvents.length < 2 ? 1 : generalGroupEvents.length < 3 ? 2 : 3;

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
  },
  musicBox: {
    marginTop: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    background: '#222222',
    borderRadius: '15px',
    height: '255px',
    textAlign: 'center',
    '@media (max-width: 1080px)': {
      minWidth: '160px',
      maxHeight: '250px'
    },
  },
  musicImg: {
    maxHeight: '50px',
    margin: '0.3rem',
  },
  musicTitle:
  {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px'
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
            <SwipeableStepper>
              { 
                mainGroupEvents.map((event : IEvent) => 

                  <BigEventCard key={ event._id } event={ event }/>

                )
              }
            </SwipeableStepper>

            { secondGroupEvents.length > 0 &&
              <Typography variant='h5' className = { styles.heading }>
                не пропустите
              </Typography>
            }
            
            <CardSlider>
              { secondGroupEvents.map((event : IEvent)=> 
            
                  <SmallEventCard key={ event._id } event={ event }/>

                )
              }
            </CardSlider>

            <Typography variant='h5' style={{ paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'}}>
              Витрина
            </Typography>
            <CardSlider>
            <Box className={ styles.musicBox }>
                <Typography variant="h5" className={ styles.musicTitle }>
                  Слушать ЭССЕ
                </Typography>
                <div style={{ display: 'flex' }}>
                  <div>
                    <a href="https://open.spotify.com/playlist/5n1GLlZVUEhcmbiiZ4NDiL?si=a8c356faf642450a">
                      <img className={ styles.musicImg } src="https://i.imgur.com/wsZUsCH.png"></img>
                    </a>
                    <a href="https://vk.com/music/playlist/142938351_70496119_c7891009bc970260b3">
                    <img className={ styles.musicImg } src="https://pngimg.com/uploads/vkontakte/vkontakte_PNG25.png"></img>
                    </a>
                  </div>

                  <div>
                    <a href="https://soundcloud.com/titi-miti-166363817/sets/mainstream-jazz?si=9ef60d1aaf8e48cda7e4141898fe6b4b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing">
                    <img className={ styles.musicImg } src="https://pngmind.com/wp-content/uploads/2019/08/Soundcloud-Logo-Png-Transparent-Background.png"></img>
                    </a>
                    <a href="https://music.yandex.ru/users/ikhozhaynov2/playlists/1012?lang=ru">
                    <img className={ styles.musicImg } src="https://rskrf.ru/upload/iblock/087/08775527999b3625409188704ce7f546.png"></img>
                    </a>
                  </div>
                </div>
              </Box>
              {storeItems.map((item) => (

                <MenuCard image={ item.image } title={ item.title } price={ item.price }></MenuCard>

              ))}
            </CardSlider>

            { generalGroupEvents.length > 0 &&
              <Typography variant='h5' className = { styles.heading }>
                В этом месяце
              </Typography>
            }

            <Container className={ styles.generalEvents }>
              { generalGroupEvents.map((event : IEvent) => 
              
                  <EventCard key={ event._id } event={ event }/>

                )
              }
            </Container>
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
