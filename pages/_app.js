import { ChakraProvider } from '@chakra-ui/provider';
import { StoreProvider } from '../libs/Store';
import theme from '../libs/theme';

const Website = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ChakraProvider>
  );
};

export default Website;
