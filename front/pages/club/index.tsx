import Head from 'next/head';
import { Box, Typography, ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import { Footer } from '../../components/footer/footer.component';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  overlay: {
    boxShadow: 'rgba(0, 0, 0, .7) 0 0 0 1000000px inset',
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
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  text: {
      paddingTop: '20px',
      paddingRight: '20px',
      paddingLeft: '20px',
      fontSize: '18px',
      lineHeight: '20px',
      fontWeight: 300,
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

export default function EventPage() {
  
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
              <Typography paragraph className = {classes.heading }>
                Джаз едет в Ростов-на-Дону!
              </Typography>
              
              <Typography paragraph className = { classes.text }>
                «Esse Jazz Club. Rostov» – это джазовый клуб и ресторан, открытый в марте 2021 года в городе Ростов-на-Дону.<br/><br/> &nbsp;&nbsp;&nbsp;&nbsp;Его история началась десять лет назад в Москве, когда в самом центре столицы в историческом здании XIX века, являющегося частью культурного наследия, заработал двухэтажный клуб.<br/><br/> &nbsp;&nbsp;&nbsp;&nbsp;С тех пор и по сегодняшний день «Эссе» занимается объединением истинных ценителей жанра, людей с тонким вкусом к жизни в атмосфере легкости, свободы и импровизации. С этой же миссией команда московского клуба направляется в южную столицу России.
              </Typography>
            </Box>
          
          <Footer position='relative'/>
          
        </motion.div>

      </>
    )
  }


  const backgroundImages = [
  {
    img: 'images/club2.jpg',
    rows: 2,
    cols: 2,
  },
  {
    img: 'images/A&P-Band-08.jpg',
    rows: 2
  },

  {
    img: 'images/kmPqz0Gf3zQ.jpg',
    cols: 3,
    rows: 1
  },
  {
    img: 'images/club2.jpg',
    cols: 2,
  },
  {
    img: 'images/A&P-Band-08.jpg',
    rows: 2,
    cols: 1,
  },
  {
    img: 'images/kmPqz0Gf3zQ.jpg',
    rows: 2
  },
  {
    img: 'images/A&P-Band-08.jpg',
    rows: 2,
    cols: 2,
  },
];

export const getStaticProps = async () => {
  return {
    props: {},
  }
 }

