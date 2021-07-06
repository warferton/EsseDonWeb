import Head from 'next/head'
import { AdminHeader } from '../components/headers/adminHeader.component';

export default function AdminMain () {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AdminHeader />
            <div className="afisha">
                <h1>Афиша</h1>
            </div>            
            <div className="events">
                <h1>Мероприятия</h1>
            </div>
        </>
    );
}