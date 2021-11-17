import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './Store';


const wrapper = ({ children }) => (
    <ChakraProvider>
      <StoreProvider>{children}</StoreProvider>
    </ChakraProvider>
  );
  

const customRender = (ui, options) =>
    render(ui, {
        wrapper: wrapper,
        ...options
    });

export * from '@testing-library/react';
export {customRender as render};