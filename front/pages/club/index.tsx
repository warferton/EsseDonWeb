import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Typography, ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';

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
    maxHeight: '750px',
    width: '85%',
    textAlign: 'center',
    border: '1.3px solid black',
    color: 'black',
    backgroundColor: '#FFFFFFF2',
    overflow: 'scroll',
    boxShadow: '0px 0px 10px #A0A0A0',
    padding: '0.75rem',
    position:'absolute',
    top: '400px',
    left: '50%',
    transform: 'translate(-50%, -0%)',
    '-moz-transform': 'translate(-50%, -50%)',
    '-webkit-transform': 'translate(-50%, -50%)',
    '-o-transform': 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
  },
  heading:{
    paddingTop: '20px',
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  text: {
      paddingTop: '5px',
      paddingRight: '20px',
      paddingLeft: '20px',
      lineHeight: '20px',
      textAlign: 'left',
  },
  image: {
    position: 'relative',
    zIndex: -1
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
           <ImageList
              cols={3}
              rowHeight={121}
              component={ 'div' }
              className= { classes.overlay }
            >
              {backgroundImages.map((item) => (
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
              <Typography variant="h4" paragraph className = {classes.heading }>
                Джаз едет в Ростов_на_Дону!
              </Typography>
              
              <Typography variant="body2" paragraph className = { classes.text }>
              &nbsp;&nbsp;&nbsp;&nbsp;«Esse Jazz Club. Rostov» – это джазовый клуб и ресторан, открытый в марте 2021 года в городе Ростов-на-Дону. Его история началась десять лет назад в Москве, когда в самом центре столицы в историческом здании XIX века, являющемся частью культурного наследия, заработал двухэтажный клуб. С тех пор и по сегодняшний день «Эссе» занимается объединением истинных ценителей жанра, людей с тонким вкусом к жизни в атмосфере легкости, свободы и импровизации.<br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;Эту же концепцию московская команда перенесла и в южную столицу России, где в самом сердце  города, на Красноармейской 166 распахнул свои двери ростовский Джаз Клуб «Эссе». Он бережно перенял все традиции своего столичного брата: кинопоказы по понедельникам, джазовые джем-сейшены по вторникам, воскресные дневные бранчи под сопровождение живой музыки. И конечно, каждый вечер в 20:00 на сцену «Эссе» выходят лучшие коллективы Ростова, Москвы, Санкт-Петербурга и других городов - отечественные и зарубежные звёзды джазовой музыки. Ресторан и бар работают ежедневно, с 11 часов утра, предлагая разнообразное меню на самый взыскательный вкус.<br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;Уютный и вместительный зал, великолепное качество звука, изысканная кухня, выступления ведущих джазовых исполнителей России и зарубежных звёзд, тематические вечера, джемы, бранчи - «Эссе» найдёт, чем удивить и восхитить даже искушенную ростовскую публику. Но самое главное - особая атмосфера настоящего джазового дома, где одинаково комфортно и зрителям, и музыкантам. «Эссе» - это место встречи всех, кто ценит живой качественный звук, хочет насладиться виртуозной игрой мастеров джазового искусства, быть в гуще музыкальной жизни города или просто вкусно поужинать в приятной обстановке.<br/><br/>
              🎺 Джаз теперь живет по адресу: Красноармейская 166.<br/><br/>
              🎉 До скорых встреч!
              </Typography>
            </Box>
                    
        </motion.div>

      </>
    )
  }


  const backgroundImages = [
  {
    img: 'images/image-hug-1.jpg',
    rows: 2,
    cols: 1,
  },
  {
    img: 'images/image-stage-2.jpg',
    rows: 2,
    cols: 1,
  },
  {
    img: 'images/image-guitar.jpg',
    rows: 2,
    cold: 1
  },
  {
    img: 'images/image-hug-2.jpg',
    rows: 2,
    cols: 1,
  },
   {
    img: 'images/image-stage-1.jpg',
    rows: 2,
    cols: 1,
  },
  {
    img: 'images/image-group-2.jpg',
    rows: 2,
    cols: 1,
  },
  {
    img: 'images/image-audience.jpg',
    rows: 2,
    cols: 1
  },
  {
    img: 'images/image-group-3.jpg',
    rows: 2,
    cols: 2,
  },
  {
    img: 'images/image-piano.jpg',
    rows: 1,
    cols: 3,
  },
];

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

