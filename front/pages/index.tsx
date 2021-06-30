import Head from 'next/head'
import { LogoHeader } from '../components/header/header.compenent'
import { Footer } from '../components/footer/footer.component'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LogoHeader/>
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
