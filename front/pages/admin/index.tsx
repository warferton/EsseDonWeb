import Head from 'next/head'
import { useRouter } from 'next/router';
import { AdminHeader } from '../../components/headers/adminHeader.component';
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
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <AdminHeader />

                <AdminMenu/>
                
            </>
        );
    }
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
