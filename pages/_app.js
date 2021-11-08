import { ChakraProvider } from '@chakra-ui/provider';
import { StoreProvider } from '../libs/Store';
import theme from '../libs/theme';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/spinner';
import Layout from '../components/Layout/layout';
import Fonts from '../components/fonts';

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
        {loading ? (
          <Layout title='Loading'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
              marginLeft='50vw'
              marginTop='40vh'
            />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </ChakraProvider>
  );
};

export default Website;
