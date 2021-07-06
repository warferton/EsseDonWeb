import Head from 'next/head'
import { LogoHeader } from '../components/headers/header.compenent'
import { Footer } from '../components/footer/footer.component'
import { TopCard } from '../components/event-page-components/event-page-top-card.component'
import { FreeEventForm } from '../components/event-page-components/freeBookingForm.component'
import { About } from '../components/event-page-components/event-page-about.component'
import { EventLineup } from '../components/event-page-components/event-linup.component'

export default function EventPage(props : boolean) {
  
  const free = props || false;

  return (
    <>
      <Head>
        <title>Event</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <LogoHeader/>

        <TopCard/>

        <About/>

        <EventLineup/>
        
        {free && <FreeEventForm/>}

        <Footer />
      </>
  )
}
