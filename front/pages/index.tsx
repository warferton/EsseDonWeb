import Head from 'next/head'
import { LogoHeader } from '../components/header/header.compenent'
import { Footer } from '../components/footer/footer.component'
import { BigEventCard } from '../components/cards/bigCard.component'
import { EventCard } from '../components/cards/card.component'
import { SmallEventCard } from '../components/cards/smallCard.component'
import { FreeEventForm } from '../components/event-page-components/form/freeBookingForm.component'
import { TopCard } from '../components/event-page-components/top-card/event-page-top-card.component'

export default function Home() {
  return (
    <>
      <Head>
        <title>Эссе-Дон</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoHeader/>
      

      {/* <SmallEventCard/> */}

      {/* <EventCard/> */}

      {/* <FreeEventForm/> */}

      <TopCard/>


      <Footer/>



      {/**
        @TODO
           Future Structure

            <Carousel>
               <BigCard/>
            </Carousel>

            <>
              Лучшее на неделе
              <Carousel>
                  <SmallCard/>
              </Carousel>
            </>
            
            <ul>
              <Card/>
                ....
                ....
              <Card/>
            </ul>

            <Footer/>
        */}
    </>
  )
}
