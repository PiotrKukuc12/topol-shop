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
import Image from 'next/image';
import db from '../../libs/db';
import Order from '../../models/Order';

const Orderid = (props) => {
  const { order } = props
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  return (
    <Layout title="Order summary">
      <Heading mt={2} ml='8%' fontSize='3xl'>
        Order {order._id}
      </Heading>
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
                  {order.shippingAddress.fullName} <br /> {order.shippingAddress.address} <br /> {order.shippingAddress.postalCode} {order.shippingAddress.city} 
                  <br /> {order.shippingAddress.country} <br /> {order.percelAddress ? `Percel: ${order.percelAddress}` : ""}
                </Text>
              </Box>
              <Box
                w='25%'
                p={5}
                borderRadius='10px'
                backgroundColor='whiteAlpha.200'
                align='center'
              >
                <Heading fontSize='lg'>Delivery</Heading>
                <Text my={2}>{order.deliveryMethod}</Text>
                <Heading fontSize='lg'>Status</Heading>
                <Text mt={2}>{!order.isDelivered ? "Pending" : "Delivered"}</Text>
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
                  {order.orderItems.map((item) => (
                    <Tr key={item._id}>
                      <Td>
                        <Image src={item.image} width={50} height={50} />
                      </Td>
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
        <Stack w='25%' h='640px' border='1px solid white'>
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
                  <Text> {order.paymentMethod} </Text>
                </Stack>
                <Stack direction='row' justifyContent='space-between'>
                  <Text>Status:</Text>
                  <Text>{!order.isPaid ? "Not paid" : "Paid"}</Text>
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
                    <Text> {order.itemsPrice} $ </Text>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between'>
                    <Text>Shipping:</Text>
                    <Text> {order.shippingPrice} $ </Text>
                  </Stack>
                </Box>
                <Stack direction='row' justifyContent='space-between'>
                  <Text fontWeight='bold'>Total:</Text>
                  <Text fontWeight='bold'> {order.totalPrice} $ </Text>
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

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { id } = params;
    await db.Connect();
    const order = await Order.findOne({ _id: id }).lean();
    return {
      props: {
        order: db.convertDocToObj(order)
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        order: null,
      },
    };
  }
}

export default Orderid;
