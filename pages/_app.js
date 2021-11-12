import { ChakraProvider } from '@chakra-ui/provider';
import { StoreProvider } from '../libs/Store';
import theme from '../libs/theme';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/spinner';
import Layout from '../components/Layout/layout';
import Fonts from '../components/fonts';
import { Box } from '@chakra-ui/layout';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const Website = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <StoreProvider>
        <PayPalScriptProvider>
          {loading ? (
            <Layout title='Loading'>
              <Box
                w='100vw'
                mt='200px'
                display='flex'
                align='center'
                justifyContent='center'
              >
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </Box>
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </ChakraProvider>
  );
};

export default Website;
