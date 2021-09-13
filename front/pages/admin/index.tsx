import Head from 'next/head'
import { useRouter } from 'next/router';
import { AdminHeader } from '../../components/headers/adminHeader.component';
import { AdminMenu } from '../../components/admin-components/main-page/admin-menu.component';
import { validateCurrentClient } from '../../utils/api-utils';
import { useEffect } from 'react';

export default function AdminMain(props: any) {
    let AUTHENTICATED = false;
    const router = useRouter();
    useEffect(()=> {
        const cookies = document.cookie;
        validateCurrentClient(cookies).then((res)=> {
            if(!res) {
                router.push('/login');
            }
            else {
                AUTHENTICATED = true;
            }
        }).catch((err)=> console.error(err));
    }, []);

    if( !AUTHENTICATED ) {
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
