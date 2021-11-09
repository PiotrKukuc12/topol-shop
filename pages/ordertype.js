import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Heading, Stack, Text, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import Layout from '../components/Layout/layout';
import { BsPaypal, BsCreditCardFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Ordertype = () => {
  const router = useRouter();
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState(null);

  const handleSubmit = () => {
      Cookies.set('payment', JSON.stringify(payment))
      Cookies.set('delivery', JSON.stringify(delivery))
  }

  return (
    <Layout title='Order'>
      <Stack
        width='100vw'
        direction={{ base: 'column', md: 'row' }}
        align='center'
        justifyContent='center'
        mt={20}
        spacing={10}
      >
        <Stack
          backgroundColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
          borderRadius='10px'
          align='center'
          width='400px'
          height='250px'
          border={useColorModeValue('1px solid gray', '1px solid white')}
        >
          <Text fontSize='xl' py={5}>
            Payment before shipment
          </Text>
          <Button
            onClick={() => setDelivery('InPost')}
            w='80%'
            border={delivery === 'InPost' ? '2px' : '0px'}
            borderColor={delivery === 'InPost' ? 'blue.600' : ''}
            fontWeight='medium'
          >
            InPost
          </Button>
          <Button
            fontWeight='medium'
            onClick={() => setDelivery('Courier')}
            w='80%'
            border={delivery === 'Courier' ? '2px' : '0px'}
            borderColor={delivery === 'Courier' ? 'blue.600' : ''}
            w='80%'
          >
            Courier
          </Button>
        </Stack>
        <Stack
          borderRadius='10px'
          align='center'
          backgroundColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
          border={useColorModeValue('1px solid gray', '1px solid white')}
          width='400px'
          height='250px'
        >
          <Text fontSize='xl' py={5}>
            Cash on delivery
          </Text>
          <Button
            fontWeight='medium'
            onClick={() => setDelivery('DPD')}
            w='80%'
            border={delivery === 'DPD' ? '2px' : '0px'}
            borderColor={delivery === 'DPD' ? 'blue.600' : ''}
            w='80%'
          >
            DPD
          </Button>
        </Stack>
      </Stack>
      <Stack
        display={
          delivery === 'InPost' || delivery === 'Courier' ? 'flex' : 'none'
        }
        mx='auto'
        mt={10}
        w='700px'
        h='250px'
        borderRadius='10px'
        backgroundColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
        border={useColorModeValue('1px solid gray', '1px solid white')}
      >
        <Text align='center' my={5} fontSize='xl'>
          Payment
        </Text>
        <Stack justifyContent='space-around' direction='row'>
          <Stack
            onClick={() => setPayment('PayPal')}
            cursor='pointer'
            direction='column'
            align='center'
            w='150px'
            h='100px'
            _hover={{
              backgroundColor: useColorModeValue(
                'blackAlpha.200',
                'whiteAlpha.200'
              ),
              transition: 'all .4s ease',
            }}
            border={
              payment === 'PayPal' ? '3px solid #2B6CB0' : '1px solid black'
            }
          >
            <Text fontSize='lg'>PayPal</Text>
            <Icon w={12} h={12} as={BsPaypal} />
          </Stack>
          <Stack
            onClick={() => setPayment('Stripe')}
            _hover={{
              backgroundColor: useColorModeValue(
                'blackAlpha.200',
                'whiteAlpha.200'
              ),
              transition: 'all .4s ease',
            }}
            direction='column'
            align='center'
            w='150px'
            h='100px'
            border='1px solid black'
            cursor='pointer'
            border={
              payment === 'Stripe' ? '3px solid #2B6CB0' : '1px solid black'
            }
          >
            <Text fontSize='lg'>Stripe</Text>
            <Icon as={BsCreditCardFill} w={12} h={12} />
          </Stack>
          <Box
            onClick={() => setPayment('traditional')}
            _hover={{
              backgroundColor: useColorModeValue(
                'blackAlpha.200',
                'whiteAlpha.200'
              ),
              transition: 'all .4s ease',
            }}
            cursor='pointer'
            align='center'
            w='150px'
            h='100px'
            border={
              payment === 'traditional'
                ? '3px solid #2B6CB0'
                : '1px solid black'
            }
          >
            <Text fontSize='xl'>Traditional transfer</Text>
          </Box>
        </Stack>
      </Stack>
      <Stack
        width='100vw'
        align='center'
        justifyContent='center'
        direction='row'
        mt={5}
        p={2}
      >
        <Button onClick={() => router.push('/checkout')} width='20%'>
          Back
        </Button>
        <Button onClick={handleSubmit} width='20%'>Submit</Button>
      </Stack>
    </Layout>
  );
};

export default Ordertype;