import Head from 'next/head'
import { useRouter } from 'next/router';
import { AdminMenu } from '../../components/admin-components/main-page/admin-menu.component';
import { validateCurrentClient } from '../../utils/api-utils';
import { useEffect, useState } from 'react';

export default function AdminMain(props: any) {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const router = useRouter();
    useEffect(()=> {
        validateCurrentClient().then((res)=> {
            if(!res) {
                router.push('/login');
            }
            else {
                setIsAuthenticated(true);
            }
        }).catch((err)=> console.error(err));
    }, []);

    if( !isAuthenticated ) {
        return <></>;
    }
    else {
        return (
            <>
                <Head>
                    <title>ESSE | ADMIN</title>
                    <meta name="description" content="EsseJazz-Don Admin Controls" />
                    <meta name="theme-color" content="#1a1a1a"/>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <AdminMenu/>
                
            </>
        );
    }
}

export const getStaticProps = async () => {

  return {
    props: {},
  }
 }
