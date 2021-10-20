import { LoginForm } from '../../components/authentication/login-form';


export default function LoginPage() {

    return(
        <>
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

