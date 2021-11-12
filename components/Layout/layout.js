import Icon from '@chakra-ui/icon';
import {
  Badge,
  Box,
  Container,
  Stack,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '@chakra-ui/react';
import Head from 'next/head';
import ThemeToggleButton from '../theme-toggle-button';
import NextLink from 'next/link';
import { Store } from '../../libs/Store';
import { useDisclosure } from '@chakra-ui/hooks';
import { BsCart2 } from 'react-icons/bs';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useContext, useRef } from 'react';
import ShoppingCart from '../products/shopping-cart';

const Layout = ({ title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const { state } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  return (
    <>
      <Box as='main'>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>{title} - TopolWear</title>
        </Head>

        <Box
          pt={4}
          backgroundColor={useColorModeValue(
            'whiteAlpha.700',
            'whiteAlpha.100'
          )}
          width='100%'
          height='70px'
        >
          <Stack direction='row' justifyContent='space-between' px={10}>
            <Stack>
              <Button p={2} size='sm' variant='link'>
                <NextLink href='/products'>
                  <Text fontSize='lg' fontWeight='normal'>
                    Items
                  </Text>
                </NextLink>
              </Button>
            </Stack>
            <Stack>
              <NextLink href='/'>
                <Text>Logo</Text>
              </NextLink>
            </Stack>
            <Stack direction='row' position='relative' spacing={5}>
              <ThemeToggleButton />
              <Icon
                // ref={btnRef}
                onClick={onOpen}
                as={BsCart2}
                cursor='pointer'
                h={8}
                w={8}
              />
              {cartItems.length > 0 ? (
                <Badge
                  borderRadius='100%'
                  position='absolute'
                  top='-3'
                  left='16'
                >
                  {cartItems.length}
                </Badge>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Current shopping cart</DrawerHeader>
            <DrawerBody>
              {cartItems.map((item) => (
                <ShoppingCart item={item} />
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Text fontSize='xl' pr={6}>
                Total: $
                {Math.round(
                  (cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
                    Number.EPSILON) *
                    100
                ) / 100}
                {/* {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} */}
              </Text>
              <NextLink href={cartItems.length >= 1 ? '/checkout' : '/products'}>
                <Button>Checkout</Button>
              </NextLink>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Box>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
