import Head from 'next/head'
import { LogoHeader } from '../components/header/header.compenent'
import { EventCard } from '../components/cards/card.component'
import { Footer } from '../components/footer/footer.component'

export default function Home() {
  return (
    <>
      <Head>
        <title>Эссе-Дон</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoHeader/>

      <EventCard/>
      <EventCard/>
      <EventCard/>

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
