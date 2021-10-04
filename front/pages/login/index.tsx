import { LoginForm } from '../../components/authentication/login-form';
import { LogoHeader } from '../../components/headers/header.compenent';
import { Footer } from "../../components/footer/footer.component";


export default function LoginPage() {

    return(
        <>
            <LogoHeader/>

            <LoginForm/>

            <Footer position='fixed'/>
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

