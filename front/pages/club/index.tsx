import Head from 'next/head';
import { Typography, makeStyles } from '@material-ui/core';
import { Footer } from '../../components/footer/footer.component';

const useStyles = makeStyles({
  root:{
      padding: '1rem',
      backgroundColor: 'white',
      borderTop: '0.25rem solid black',
  },

  heading:{
    paddingRight: '20px',
    paddingLeft: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    paddingTop: '30px',
  },

  text: {
      paddingTop: '20px',
      paddingRight: '20px',
      paddingLeft: '20px',
      fontSize: '18px',
      lineHeight: '20px',
      fontWeight: 300,
  },

  image:  {
    width: '100%',
    height: 'auto',
  }
});

export default function EventPage() {
  
  const classes = useStyles();

    return (
      <>
        <Head>
          <title>О Клубе</title>
          <meta name="История Джаз Клуба Эссе Дон" content="«Esse Jazz Club. Rostov» – это джазовый клуб и ресторан, открытый в марте 2021 года в городе Ростов-на-Дону." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <>

          <img src="images/club2.jpg" className={classes.image} alt="фото джаз клуба Эссе"/>

          <Typography paragraph className = {classes.heading }style={
                  {
                    display: 'flex',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}
          >
          Джаз едет в Ростов-на-Дону!
          </Typography>
          
          <Typography paragraph className = { classes.text }>
            «Esse Jazz Club. Rostov» – это джазовый клуб и ресторан, открытый в марте 2021 года в городе Ростов-на-Дону.<br/><br/> &nbsp;&nbsp;&nbsp;&nbsp;Его история началась десять лет назад в Москве, когда в самом центре столицы в историческом здании XIX века, являющегося частью культурного наследия, заработал двухэтажный клуб.<br/><br/> &nbsp;&nbsp;&nbsp;&nbsp;С тех пор и по сегодняшний день «Эссе» занимается объединением истинных ценителей жанра, людей с тонким вкусом к жизни в атмосфере легкости, свободы и импровизации. С этой же миссией команда московского клуба направляется в южную столицу России.
          </Typography>
          
          <Footer position='relative'/>
        </>

      </>
    )
  }