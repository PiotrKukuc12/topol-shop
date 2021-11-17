import { ChakraProvider } from '@chakra-ui/provider';
import { StoreProvider } from '../libs/Store';
import theme from '../libs/theme';
import Fonts from '../components/fonts';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import NextNProgress from 'nextjs-progressbar';

const Website = ({ Component, pageProps }) => {

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <StoreProvider>
        <PayPalScriptProvider>
          <NextNProgress
            color='#29D'
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </StoreProvider>
    </ChakraProvider>
  );
};

export default Website;
