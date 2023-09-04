import '../styles/globals.css'
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';
import { LogoHeader } from '../components/headers/header.compenent';
import { AdminHeader } from '../components/headers/adminHeader.component';
import { NavigationSelector } from '../components/navigation/navigation-selector.component';

export default function MyApp(props : any) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const isAdminPage = router.route.includes("admin") || router.route.includes("login");

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Эссе-Дон</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="canonical" href="https://essedon.ru"/>
        <meta name="theme-color" content="#1a1a1a"/>
        <link rel="manifest" href="/manifest.json"/>
      </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          { isAdminPage ? 
              <div style={{ backgroundColor: '#FFFFFF', position: 'relative', zIndex:100, minHeight: '100vh', }}>
                <AdminHeader /> 
                <Component {...pageProps} key={ router.route }/>
              </div>
              :
              <div key={ router.route } style={{ position: 'relative', zIndex:100 }} className={ 'background-container' }>
                    <LogoHeader/> 
                    <NavigationSelector>
                        <Component {...pageProps} key={ router.route }/>
                    </NavigationSelector>
              </div>
          }
        </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};