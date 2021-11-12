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
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout/layout';
import { Store } from '../../libs/Store';
import Image from 'next/image';
import db from '../../libs/db';
import Order from '../../models/Order';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useRouter } from 'next/dist/client/router';



const Orderid = (props) => {
  const { order } = props;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [loadingPay, setLoadingPay] = useState(false)
  const [paid, setPaid] = useState(null)
  const toast = useToast()

  useEffect(() => {
    if (order.isPaid === true){
      setPaid('Paid')
    } else {
      setPaid('Not Paid')
    }
    const loadPaypalScript = async () => {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': process.env.PAYPAL_CLIENT_ID,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
    };

    loadPaypalScript()
  }, [order,]);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function(details) {
      try { 
        setLoadingPay(true)
        await axios.put(
          `http://localhost:3000/api/order/${order._id}/pay`,
          details,
        )
        setPaid('Paid')
        toast({
          title: 'Successfully payment',
          status: 'success',
          duration: '5000',
          isClosable: true,
        })
        setLoadingPay(false)
      } catch(error) {
        setLoadingPay(false)
        console.log(error)
      }
    })
  }

  function onError(error) {
    console.log(error)
  }

  return (
    <Layout title='Order summary'>
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
                  {order.shippingAddress.fullName} <br />{' '}
                  {order.shippingAddress.address} <br />{' '}
                  {order.shippingAddress.postalCode}{' '}
                  {order.shippingAddress.city}
                  <br /> {order.shippingAddress.country} <br />{' '}
                  {order.percelAddress ? `Percel: ${order.percelAddress}` : ''}
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
                <Text mt={2}>
                  {!order.isDelivered ? 'Pending' : 'Delivered'}
                </Text>
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
              overflowY={order.orderItems.length >= 9 ? 'scroll' : 'none'}
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
                  <Text>{paid}</Text>
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
            <Box p={5}>
              <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              ></PayPalButtons>
            </Box>
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
        order: db.convertDocToObj(order),
      },
    };
  } catch (error) {
    return {
      props: {
        order: null,
      },
    };
  }
}

export default Orderid;
