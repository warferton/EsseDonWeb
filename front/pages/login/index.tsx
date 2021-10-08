import { LoginForm } from '../../components/authentication/login-form';
import { LogoHeader } from '../../components/headers/header.compenent';


export default function LoginPage() {

    return(
        <>
            <LogoHeader/>

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

