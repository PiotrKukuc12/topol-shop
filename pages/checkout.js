import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import { useState } from 'react';
import Layout from '../components/Layout/layout';

const Checkout = () => {
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState(null);
  const [address, setAdress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  return (
    <Layout title='Checkout'>
      <Stack maxW='xl' mx='auto'>
        <Heading fontSize='3xl' textAlign='left' mt={5}>
          1.Shipping Address
        </Heading>
        <FormControl
          backgroundColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
          p={5}
          borderRadius='5px'
          mt={2}
        >
          <FormLabel>Full Name</FormLabel>
          <Input
            onChange={(e) =>
              setAdress({
                ...address,
                fullName: e.target.value,
              })
            }
            type='text'
            placeholder='John Doe'
            required
            variant='outline'
          />
          <FormLabel>Address</FormLabel>
          <Input
            onChange={(e) =>
              setAdress({
                ...address,
                address: e.target.value,
              })
            }
            type='text'
            placeholder='Awenue 66/12'
            required
            variant='outline'
          />
          <FormLabel>City</FormLabel>
          <Input
            onChange={(e) =>
              setAdress({
                ...address,
                city: e.target.value,
              })
            }
            type='text'
            placeholder='Berlin'
            required
            variant='outline'
          />
          <FormLabel>Postal Code</FormLabel>
          <Input
            onChange={(e) =>
              setAdress({
                ...address,
                postalCode: e.target.value,
              })
            }
            type='number'
            placeholder='67-112'
            required
            variant='outline'
          />
          <FormLabel>Country</FormLabel>
          <Input
            onChange={(e) =>
              setAdress({
                ...address,
                country: e.target.value,
              })
            }
            type='text'
            placeholder='Deutschland'
            required
            variant='outline'
          />
          <FormLabel>Delivery</FormLabel>
          <RadioGroup
            required
            onChange={setDelivery}
            value={delivery}
            p={2}
            borderRadius={5}
            backgroundColor={useColorModeValue(
              'blackAlpha.50',
              'whiteAlpha.50'
            )}
          >
            <Stack direction='row' spacing={10}>
              <Radio value='inpost'>InPost</Radio>
              <Radio value='courier'>Courier</Radio>
            </Stack>
          </RadioGroup>
          <FormLabel>Payment</FormLabel>
          <RadioGroup
            required
            onChange={setPayment}
            value={payment}
            p={2}
            borderRadius={5}
            backgroundColor={useColorModeValue(
              'blackAlpha.50',
              'whiteAlpha.50'
            )}
          >
            <Stack direction='row' spacing={10}>
              <Radio value='paypal'>Paypal</Radio>
              <Radio value='cash'>Cash</Radio>
            </Stack>
          </RadioGroup>
          <Button onClick={() => console.log(address)} mt={5} width='100%'>
            Continue
          </Button>
        </FormControl>
      </Stack>
    </Layout>
  );
};

export default Checkout;
