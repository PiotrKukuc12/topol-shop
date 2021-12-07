import {
  Stack,
  Box,
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
import {  useEffect, useState } from 'react';
import Layout from '../../components/Layout/layout';
import Image from 'next/image';
import db from '../../libs/db';
import Order from '../../models/Order';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useColorModeValue } from '@chakra-ui/color-mode';


const Orderid = (props) => {
  const { order } = props;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [loadingPay, setLoadingPay] = useState(false);
  const [paid, setPaid] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (order.isPaid === true) {
      setPaid('Paid');
    } else {
      setPaid('Not Paid');
    }
    const loadPaypalScript = async () => {
      const { data: clientID } = await axios.get('/api/order/key');
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientID,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };

    loadPaypalScript();
  }, [order]);

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  }

  function onApprove(actions) {
    return actions.order.capture().then(async function (details) {
      try {
        setLoadingPay(true);
        await axios.put(`/api/order/${order._id}/pay`, details);
        setPaid('Paid');
        toast({
          title: 'Successfully payment',
          status: 'success',
          duration: '5000',
          isClosable: true,
        });
        setLoadingPay(false);
      } catch (error) {
        setLoadingPay(false);
        console.log(error);
      }
    });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Layout title='Order summary'>
      <Heading mt={2} ml='8%' fontSize={{base:'xl',md:'2xl',lg:'3xl'}}>
        Order {order._id}
      </Heading>
      <Stack
        w='100vw'
        my={10}
        spacing={10}
        direction={{base:'column-reverse', lg:'row'}}
        align={{base:'center', lg:'initial'}}
        justifyContent='space-around'

      >
        <Stack
          w={{base:'90%',lg:'40%'}}
          h='640px'
          borderRadius='10px'
          border={useColorModeValue('1px solid black', '1px solid white')}
        >
          <Box>
            <Heading ml={5} my={5} fontSize='xl'>
              Delivery Address
            </Heading>
            <Stack direction={{base:'column-reverse',lg:'row'}} align='center' spacing={10}>
              <Box
                ml={{base:'0',lg:'10'}}
                w={{base:'80%',lg:'40%'}}
                p={5}
                borderRadius='10px'
                backgroundColor={useColorModeValue(
                  'blackAlpha.200',
                  'whiteAlpha.200'
                )}
              >
                <Text align={{base:'center', lg:'left'}}>
                  {order.shippingAddress.fullName} <br />{' '}
                  {order.shippingAddress.address} <br />{' '}
                  {order.shippingAddress.postalCode}{' '}
                  {order.shippingAddress.city}
                  <br /> {order.shippingAddress.country} <br />{' '}
                  {order.percelAddress ? `Percel: ${order.percelAddress}` : ''}
                </Text>
              </Box>
              <Box
                w={{base:'80%',lg:'35%'}}
                p={5}
                borderRadius='10px'
                backgroundColor={useColorModeValue(
                  'blackAlpha.200',
                  'whiteAlpha.200'
                )}
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
              backgroundColor={useColorModeValue(
                'blackAlpha.200',
                'whiteAlpha.200'
              )}
              h={{base:'150px', lg:'340px'}}
              overflowY='auto'
            >
              <Table size='sm'>
                <Thead>
                  <Tr>
                    <Th display={{base:"none", lg:'inline-block'}}>Image</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.orderItems.map((item) => (
                    <Tr key={item.name}>
                      <Td display={{base:"none", lg:'inline-block'}}>
                        <Image src={item.image} width={50} height={50} />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td isNumeric>${item.price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Stack>
        <Stack
          w={{base:'90%',lg:'25%'}}
          h='auto'
          overflowY= 'hidden'
          borderRadius='10px'
          border={useColorModeValue('1px solid black', '1px solid white')}
        >
          <Box>
            <Heading ml={5} my={5} fontSize='xl'>
              Payment
            </Heading>
            <Stack direction='row' spacing={10}>
              <Box

                // ml={10}
                margin='auto'
                w='70%'
                p={5}
                borderRadius='10px'
                backgroundColor={useColorModeValue(
                  'blackAlpha.200',
                  'whiteAlpha.200'
                )}
              >
                <Stack  direction='row' justifyContent='space-between'>
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
              align='center'
                // ml={10}
                margin='auto'
                w='70%'
                p={5}
                borderRadius='10px'
                backgroundColor={useColorModeValue(
                  'blackAlpha.200',
                  'whiteAlpha.200'
                )}
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
            <Box align='center' p={5}>
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
