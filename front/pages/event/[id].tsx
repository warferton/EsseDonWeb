import Head from 'next/head';
import { Container, makeStyles } from '@material-ui/core';
import { Footer } from '../../components/footer/footer.component';
import { TopCard } from '../../components/event-page-components/event-page-top-card.component';
import { FreeEventForm } from '../../components/event-page-components/freeBookingForm.component';
import { About } from '../../components/event-page-components/event-page-about.component';
import { EventLineup } from '../../components/event-page-components/event-linup.component';
import { VideoPlayer } from '../../components/event-page-components/event-videoPlayer.component';
import { IEvent } from '../../types/event/event.type';
import { getEventById } from '../../utils/api-utils';
import { motion } from 'framer-motion';


const useStyles = makeStyles({
  body: {
    boxShadow: '0px 0px 15px #11111185',
    '@media (min-width: 684px)': {
      alignItems: 'center',
      maxWidth: '75%',
      marginTop: '0.1rem'
    },
    maxWidth: '100%',
    padding: 0
  },
  background: {
    backgroundColor: '#FFFFFF',
  },
})

interface IProps{
  event: IEvent;
}

export default function EventPage({event} : IProps) {

  const classes = useStyles();

  const animVariants = {
    hidden: { opacity: 0, x: 250, y:0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 200, y: 0 },
  }
  
  return (
    <motion.main
      variants={ animVariants }
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'spring', damping: 15, bounce: 0.20 }}
    >
      <Head>
        <title>{ event.title }</title>
        <meta name="description" content={ event.shortDescription } />
        <meta name="theme-color" content="#1a1a1a"/>    
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className={ classes.background }> */}
        <Container className={ classes.body }>

          <TopCard event={ event }/>

          <About description={ event.description } />

          <EventLineup lineup={ event.lineup }/>

          { event.videoLink && <VideoPlayer videoLink={ event.videoLink }/> }

          { event.free === 'true' && <FreeEventForm event={ event }/> }

        </Container>
      {/* </div> */}

      <Footer position='static'/>
        
    </motion.main>
  )
}

export const getServerSideProps = async (context: any) => {
  
  const { id } = context.params;
  
  return await getEventById(id)
  .then( event => {
    if(event === null || event === undefined || event.title === undefined) {
      return {
        notFound: true
      }
    } else {
      return {
        props: {
          event
        }
      }
    }
  }) 
  
}
