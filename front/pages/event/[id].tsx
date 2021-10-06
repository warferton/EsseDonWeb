import Head from 'next/head';
import { Container, makeStyles } from '@material-ui/core';
import { LogoHeader } from '../../components/headers/header.compenent';
import { Footer } from '../../components/footer/footer.component';
import { TopCard } from '../../components/event-page-components/event-page-top-card.component';
import { FreeEventForm } from '../../components/event-page-components/freeBookingForm.component';
import { About } from '../../components/event-page-components/event-page-about.component';
import { EventLineup } from '../../components/event-page-components/event-linup.component';
import { VideoPlayer } from '../../components/event-page-components/event-videoPlayer.component';
import { IEvent } from '../../types/event/event.type';
import { getEventById } from '../../utils/api-utils';


const useStyles = makeStyles({
  body: {
    boxShadow: '0px 0px 15px #11111185',
    '@media (min-width: 684px)': {
      alignItems: 'center',
      maxWidth: '80%',
    },
    maxWidth: '100%',
    padding: 0
  }
})

interface IProps{
  event: IEvent;
}

export default function EventPage({event} : IProps) {

  const classes = useStyles();
  
  return (
    <>
      <Head>
        <title>{ event.title }</title>
        <meta name="description" content={ event.shortDescription } />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <LogoHeader/>

      <Container className={ classes.body }>

        <TopCard event={ event }/>

        <About description={ event.description } />

        <EventLineup lineup={ event.lineup }/>

        {event.videoLink && <VideoPlayer videoLink={event.videoLink}/>}

        {event.free === 'true' && <FreeEventForm event={ event }/>}

      </Container>

      <Footer position='static'/>
    </>
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
