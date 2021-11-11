import {
  Stack,
  Box,
  Button,
  Text,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import Layout from '../../components/Layout/layout';
import { Store } from '../../libs/Store';
import Image from 'next/image'

const Orderid = () => {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  return (
    <Layout>
    <Heading mt={2} ml='8%'  fontSize='3xl'>Order 123435434353</Heading>
      <Stack
        w='100vw'
        mt={10}
        spacing={10}
        direction='row'
        justifyContent='space-around'
      >
        <Stack w='40%' h='640px' border='1px solid white'>
          <Box>
            <Heading ml={5} my={5} fontSize='xl'>
              Delivery Address
            </Heading>
            <Stack direction='row' spacing={10}>
              <Box
                ml={10}
                w='50%'
                p={5}
                borderRadius='10px'
                backgroundColor='whiteAlpha.200'
              >
                <Text>
                  Piotr Kukuc <br /> Ignacego Daszynskiego 25 <br /> Wroclaw{' '}
                  <br /> Polska{' '}
                </Text>
              </Box>
              <Box
                w='25%'
                p={5}
                borderRadius='10px'
                backgroundColor='whiteAlpha.200'
                align='center'
              >
                <Heading fontSize='lg'>Status</Heading>
                <Text mt={5}>Pending</Text>
              </Box>
            </Stack>
            <Heading ml={5} my={5} fontSize='xl'>
              Order Summary
            </Heading>
            <Box
              m={5}
              p={3}
              borderRadius='10px'
              backgroundColor='whiteAlpha.200'
              h='280px'
              overflowY={cartItems.length >= 9 ? 'scroll' : 'none'}
            >
              <Table size='sm'>
                <Thead>
                  <Tr>
                  <Th>Image</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Quantity</Th>
                    <Th isNumeric>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map((item) => (
                    <Tr key={item._id}>
                    <Td><Image src={item.image} width={50} height={50} /></Td>
                      <Td>{item.name}</Td>
                      <Td isNumeric>{item.quantity}x</Td>
                      <Td isNumeric>${item.price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Stack>
        <Stack w='25%'  h='640px' border='1px solid white'>
          <Box>
            <Heading ml={5} my={5} fontSize='xl'>
              Payment
            </Heading>
            <Stack direction='row' spacing={10}>
              <Box
                ml={10}
                w='70%'
                p={5}
                borderRadius='10px'
                backgroundColor='whiteAlpha.200'
              >
                 <Stack direction='row' justifyContent='space-between'>
                  <Text>Method:</Text>
                  <Text> PayPal </Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Text>Status:</Text>
                  <Text>Not Paid</Text>
                </Stack>
              </Box>
            </Stack>
            <Heading ml={5} my={5} fontSize='xl'>
              Items Summary
            </Heading>
            <Stack>
              <Box
                ml={10}
                w='70%'
                p={5}
                borderRadius='10px'
                backgroundColor='whiteAlpha.200'
              >
              <Box mb={5}>
                <Stack direction='row' justifyContent='space-between'>
                  <Text>Items:</Text>
                  <Text> 70 $ </Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Text>Shipping:</Text>
                  <Text> 15 $ </Text>
                </Stack>
              </Box>
              <Stack direction='row' justifyContent='space-between'>
                  <Text fontWeight='bold'>Total:</Text>
                  <Text fontWeight='bold'> 55 $ </Text>
                </Stack>
              </Box>
            </Stack>
            <Heading ml={5} my={5} fontSize='xl'>
              Payment
            </Heading>
          </Box>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Orderid;
