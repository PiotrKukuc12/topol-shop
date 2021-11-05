import Icon from '@chakra-ui/icon';
import { Badge, Box, Container, Stack, Text, Button } from '@chakra-ui/react';
import Head from 'next/head';
import ThemeToggleButton from '../theme-toggle-button';
import NextLink from 'next/link'

import { BsCart2 } from 'react-icons/bs';
import { useColorModeValue } from '@chakra-ui/color-mode';

const Layout = ({ title, children }) => {
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
          width='100vw'
          height='70px'
        >
          <Stack direction='row' justifyContent='space-between' px={10}>
            <Stack>
            <Button  p={2} size='sm' variant='link'>
            <NextLink href='/products'>
              <Text fontSize='lg' fontWeight='normal'>Items</Text>
            </NextLink>
            </Button>
            </Stack>
            <Stack>
              <Text>Logo</Text>
            </Stack>
            <Stack direction='row' position='relative' spacing={5}>
              <ThemeToggleButton />
              <Icon as={BsCart2} h={8} w={8} />
              <Badge borderRadius='100%' position='absolute' top='-3' left='16'>
                2
              </Badge>
            </Stack>
          </Stack>
        </Box>

        <Container p={0} m={0}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;
