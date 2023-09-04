import Head from 'next/head';
import React, { useEffect } from 'react';
import { Typography, makeStyles, Container, Link, Box } from '@material-ui/core';
import { SwipeableStepper } from '../../components/cards/carousel/carousel.component';

const useStyles = makeStyles({
    description: {
      padding: '1rem',
    },
    box: {
        paddingTop: '20px',
        background: 'white',
        width: '100%',
        padding: 0,
        '@media (min-width: 1080px)' : {
          width: '75%',
          alignItems: 'center',
        }
    },
    text: {
        fontSize: '18px',
        lineHeight: '20px',
        fontWeight: 300,
        paddingBottom: '20px',
    },
    sectionHeader: {
        fontSize: '24px',
        fontWeight: 500,
        padding: '0.7rem',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        textAlign: 'center',
    },
    openSpaceContainer: {
        background: 'white',
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    image: {
        width: '100%',
        height: '100%',
    }
  });

export default function OpenSpacePage() {

  useEffect(()=> {
    localStorage.setItem("EsseCurentPageName", "open-space");
  })

  const classes = useStyles();

  return (
    <>
      <Head>
          <title>Open Space</title>
          <meta name="description" content="Эссе это не только концертная площадка, но и открытое пространство" />
          <link rel="canonical" href="https://essedon.ru/open-space"/>
          <meta name="theme-color" content="#1a1a1a"/>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json"/>
      </Head>
      <Container className={ classes.box }>
            <Typography variant='h4' className={ classes.sectionHeader }>
                Open Space
            </Typography>
            <Box className={ classes.description }>
              <Typography className={ classes.text }>
                  Эссе это не только концертная площадка, но и открытое пространство.
              </Typography>
              <Typography className={ classes.text }>
                  Мы готовы предоставить клуб для вашего бизнес-завтрака, презентации или лекции.
              </Typography>
            </Box>
          <SwipeableStepper>
                { 
                  images.map((imgSrc : string) => 

                    <img
                      src={ imgSrc }
                      className= { classes.image }
                      key={ imgSrc }
                    />

                  )
                }
          </SwipeableStepper>
          <Box className={ classes.description }>
            <Typography variant='body2' className={ classes.text }>
                Для организации мероприятия обращайтесь по телефону:<br/><br/>
                <Link href='tel: +78633104110'> 
                        { '+7 863 310 41 10' }
                </Link>
            </Typography>
          </Box>
      </Container>
    </>
  )
}
const images = [
    'images/openSpace3-min.jpg',
    'images/openSpace2-min.jpg',
    'images/openSpace-min.jpg',
];

export const getStaticProps = async () => {
  return {
    props: {},
  }
 }

