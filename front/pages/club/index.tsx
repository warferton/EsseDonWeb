import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Typography, ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

const useStyles = makeStyles({
  overlay: {
    boxShadow: 'rgba(0, 0, 0, .5) 0 0 0 1000000px inset',
    margin: '0 !important',
  },
  blackBackground: {
    backgroundColor: '#000',
    position: 'relative',
    zIndex: -2
  },
  infoBox: {
    width: '100%',
    border: '1.3px solid black',
    color: 'black',
    backgroundColor: '#FFFFFFF2',
    boxShadow: '0px 0px 10px #A0A0A0',
    padding: '0.75rem',
    '@media(min-width: 1080px)' : {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }
  },
  heading:{
    paddingTop: '20px',
    textAlign: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  text: {
      paddingTop: '5px',
      paddingRight: '20px',
      paddingLeft: '20px',
      lineHeight: '30px',
      textAlign: 'left',
      fontSize: '18px',
      '@media(min-width: 1080px)' : {
        width: '60%',
        textAlign: 'center',
      },
  },
  image: {
    position: 'relative',
    zIndex: -1
  },
  video: {
    margin: '0px',
    '@media(min-width: 1080px)' : {
      height: '70vh',
    }
  },
  sectionHeader: {
    fontSize: '24px',
    fontWeight: 500,
    paddingTop: '0.7rem',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    textAlign: 'center',
    width: '100%',
  },
  musicBox: {
    marginTop: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    background: '#222222',
    borderRadius: '15px',
    width: 'auto',
    maxWidth: '300px',
    textAlign: 'center',
  },
  musicTitle:
  {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
  },
  musicImg: {
    maxHeight: '50px',
    marginTop: '1rem',
    marginRight: '0.5rem',
  },
  Playlist: {
    border: 'none',
    height:'700px',
    width: '100%',
    paddingBottom: '20px',
    '@media(min-width: 1080px)' : {
      width: '70%'
    }   
  }
});

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ClubInfoPage() {
  
  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "club");
  })
  
  const classes = useStyles();

  const animVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

    return (
      <>
        <Head>
          <title>О Клубе</title>
          <meta name="История Джаз Клуба Эссе Дон" content="«Esse Jazz Club. Rostov» – это джазовый клуб и ресторан, открытый в марте 2021 года в городе Ростов-на-Дону." />
          <link rel="canonical" href="https://essedon.ru/club"/>
          <meta name="theme-color" content="#1a1a1a"/>
          <link rel="manifest" href="/manifest.json"/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <motion.div
          variants={ animVariants }
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: 'linear' }}
          className={ classes.blackBackground }
        >
          <div className= { classes.video }>
           <ReactPlayer playing loop controls volume={0.5} width='100%' height='100%' url='videos/esse_promo.mp4' />
          </div> 
           <Box className={classes.infoBox}>
              <Typography variant="h5" paragraph className = {classes.heading }>
                Джаз Клуб ЭССЕ
              </Typography>
              
              <Typography variant="body2" paragraph className = { classes.text }>
              &nbsp;&nbsp;&nbsp;&nbsp;«Esse Jazz Club. Rostov» – это джазовый клуб и ресторан, открытый в марте 2021 года в городе Ростов-на-Дону. Его история началась десять лет назад в Москве, когда в самом центре столицы в историческом здании XIX века, являющемся частью культурного наследия, заработал двухэтажный клуб. Эту же концепцию московская команда перенесла и в южную столицу России, где в самом сердце  города, на Красноармейской 166 распахнул свои двери ростовский Джаз Клуб «Эссе».<br/>
              </Typography>
             </Box>
           <ImageList
              cols={3}
              rowHeight={121}
              component={ 'div' }
            >
              {backgroundImages1.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    loading="lazy"
                    className= { classes.image }
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Box className={classes.infoBox}>

            <Typography variant="body2" paragraph className = { classes.text }>
              <br/>Ростовский клуб бережно перенял все традиции своего столичного брата: кинопоказы по понедельникам, джазовые джем-сейшены по вторникам, воскресные дневные бранчи под сопровождение живой музыки. И конечно, каждый вечер в 20:00 на сцену «Эссе» выходят лучшие коллективы Ростова, Москвы, Санкт-Петербурга и других городов - отечественные и зарубежные звёзды джазовой музыки. Ресторан и бар работают ежедневно, с 11 часов утра, предлагая разнообразное меню на самый взыскательный вкус.<br/>
              <br/>🎺 Джаз теперь живет по адресу: Красноармейская 166.<br/><br/>
              🎉 До скорых встреч!
            </Typography>

            </Box>

            <ImageList
              cols={3}
              rowHeight={121}
              component={ 'div' }
            >
              {backgroundImages2.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    loading="lazy"
                    className= { classes.image }
                  />
                </ImageListItem>
              ))}
            </ImageList>  

            <Box className={ classes.infoBox }>

              <Typography variant='h4' className={ classes.sectionHeader }>
                Плейлисты от Эссе
              </Typography>

              <Typography className={ classes.text }>
                Подборка хорошей качественной музыки от джазовых стандартов до экспериментальных проектов.
              </Typography>


              <Box className={ classes.musicBox }>
                <Typography variant="h5" className={ classes.musicTitle }>
                  Слушать на всех площадках
                </Typography>
                <a href="https://open.spotify.com/playlist/5n1GLlZVUEhcmbiiZ4NDiL?si=a8c356faf642450a">
                  <img className={ classes.musicImg } src="https://pnggrid.com/wp-content/uploads/2021/05/Spotify-PNG-Logo-2048x2046.png"></img>
                </a>
                <a href="https://vk.com/music/playlist/142938351_70496119_c7891009bc970260b3">
                  <img className={ classes.musicImg } src="https://pngimg.com/uploads/vkontakte/vkontakte_PNG25.png"></img>
                </a>
                <a href="https://soundcloud.com/titi-miti-166363817/sets/mainstream-jazz?si=9ef60d1aaf8e48cda7e4141898fe6b4b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing">
                  <img className={ classes.musicImg } src="https://pngmind.com/wp-content/uploads/2019/08/Soundcloud-Logo-Png-Transparent-Background.png"></img>
                </a>
                <a href="https://music.yandex.ru/users/ikhozhaynov2/playlists/1012?lang=ru">
                  <img className={ classes.musicImg } src="https://rskrf.ru/upload/iblock/087/08775527999b3625409188704ce7f546.png"></img>
                </a>
              </Box>

              <iframe 
                className={ classes.Playlist }
                src="https://music.yandex.com/iframe/#playlist/ikhozhaynov2/1019">
                  Listen to 
                  <a href='https://music.yandex.com/users/ikhozhaynov2/playlists/1019?lang=en'>
                    Mainstream Jazz sh.
                  </a> 
                    — 
                  <a href='https://music.yandex.com/users/ikhozhaynov2'>
                    ikhozhaynov2
                  </a>
                  on Yandex Music
              </iframe>
            </Box>

        </motion.div>

      </>
    )
  }


  const backgroundImages1 = [
  {
    img: 'images/image-group-3.jpg',
    rows: 2,
    cols: 1
  },
  {
    img: 'images/clubEsseDon-0.jpg',
    rows: 2,
    cols: 2,
  },
  {
    img: 'images/image-hug-2.jpg',
    rows: 2,
    cols: 2,
  },
  {
    img: 'images/image-hug-1.jpg',
    rows: 2,
    cols: 1,
  }
];

const backgroundImages2 = [
  {
    img: 'images/image-guitar.jpg',
    rows: 2,
    cols: 1,
  },
  {
    img: 'images/clubEsseDon-5.jpg',
    rows: 2,
    cols: 2,
  },
  {
    img: 'images/clubEsseDon-4.jpg',
    rows: 2,
    cols: 2
  },
  {
    img: 'images/image-stage-1.jpg',
    rows: 2,
    cols: 1,
  },
  {
    img: 'images/image-piano.jpg',
    rows: 2,
    cols: 3,
  },
];

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

