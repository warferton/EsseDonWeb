import '../styles/globals.css'
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';
import { AnimatePresence } from 'framer-motion';
import { LogoHeader } from '../components/headers/header.compenent';
import { AdminHeader } from '../components/headers/adminHeader.component';
import { NavigationFab } from '../components/navigation/navigation-fab.component';

export default function MyApp(props : any) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const isAdminPage = router.route.includes("admin");

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
      </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
            <AnimatePresence initial={ false } exitBeforeEnter >
              <div key={ router.route }>
                { !isAdminPage ? <LogoHeader/> : <AdminHeader /> }
                <NavigationFab>
                    <Component {...pageProps} key={ router.route }/>
                </NavigationFab>
              </div>
            </AnimatePresence>
        </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};