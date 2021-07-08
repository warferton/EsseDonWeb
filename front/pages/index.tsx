import Head from 'next/head'
import Carousel from 'react-material-ui-carousel'
import { CardSlider } from '../components/cards/slider/card-slider.component'
import { LogoHeader } from '../components/headers/header.compenent'
import { Footer } from '../components/footer/footer.component'
import { BigEventCard } from '../components/cards/bigCard.component'
import { EventCard } from '../components/cards/card.component'
import { SmallEventCard } from '../components/cards/smallCard.component'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'

export default function Home() {
  return (
    <>
      <Head>
        <title>Эссе-Дон</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoHeader/>
     

      <Carousel
      animation='slide' 
      indicators={ false } 
      interval={ 10000 } 
      timeout={ 100 }
      PrevIcon={ <ArrowBackIosOutlined fontSize='large'/> }
      NextIcon={ <ArrowForwardIosOutlined fontSize='large'/> }
      >
        <BigEventCard/>
        <BigEventCard/>
        <BigEventCard/>
        <BigEventCard/>
        <BigEventCard/>
      </Carousel>

      <CardSlider>
        <SmallEventCard/>
        <SmallEventCard/>
        <SmallEventCard/>
        <SmallEventCard/>
      </CardSlider>

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
