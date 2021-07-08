import Head from 'next/head'

import { LogoHeader } from '../components/headers/header.compenent'
import { LogoHeader } from '../components/header/header.compenent'
import { AboutContact } from '../components/contact-page-components/about.component'
import { ArtistForm } from '../components/contact-page-components/artist-form.component'


export default function Contacts(props: boolean) {

  const artist = props || false;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>        

      <LogoHeader/>

      <AboutContact />

      {artist && <ArtistForm />}

    </>
  )
}
