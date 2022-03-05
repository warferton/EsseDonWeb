import Head from 'next/head';
import { LoginForm } from '../../components/authentication/login-form';


export default function LoginPage() {

    return(
        <>
            <Head>
                <title>Вход</title>
                <meta name="description" content="ЭССЕ-ДОН | Вход" />
                <link rel="canonical" href="https://essedon.ru/login"/>
                <meta name="theme-color" content="#1a1a1a"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LoginForm/>
        </>
    );
}

export const getServerSideProps = async ({ req, res } : any) => {
    res.setHeader(
    'Cache-Control',
    'public, s-maxage=180000, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
 }

