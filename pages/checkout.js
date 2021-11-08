import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading, Stack } from '@chakra-ui/layout';
import { Field, Form, Formik } from 'formik';
import Layout from '../components/Layout/layout';

const Checkout = () => {
  return (
    <Layout title='Checkout'>
      <Stack
        width='100vw'
        direction={{ base: 'column', md: 'row' }}
        align='center'
        justifyContent='space-around'
      >
        <Box
          mt={5}
          backgroundColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
          p={5}
          borderRadius='5px'
          width={{ base: '80%', md: '40%' }}
        >
          <Heading ml={5} mb={3}>
            1. Address
          </Heading>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              address: '',
              city: '',
              postalCode: '',
              country: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.fullName) {
                errors.fullName = 'Required';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              if (!values.address) {
                errors.address = 'Required';
              }

              if (!values.city) {
                errors.city = 'Required';
              }
              if (!values.postalCode) {
                errors.postalCode = 'Required';
              }
              if (!values.country) {
                errors.country = 'Required';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                {/* FULL NAME */}
                <FormControl isInvalid={errors.fullName && touched.fullName}>
                  <FormLabel htmlFor='fullName'>Full Name</FormLabel>
                  <Input
                    borderColor={useColorModeValue(
                      'blackAlpha.600',
                      'whiteAlpha.600'
                    )}
                    type='text'
                    name='fullName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                  />
                  <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                </FormControl>
                {/* EMAIL */}
                <FormControl isInvalid={errors.email && touched.email}>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                    borderColor={useColorModeValue(
                      'blackAlpha.600',
                      'whiteAlpha.600'
                    )}
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                {/* ADDRESS */}
                <FormControl isInvalid={errors.address && touched.address}>
                  <FormLabel htmlFor='address'>Address</FormLabel>
                  <Input
                    borderColor={useColorModeValue(
                      'blackAlpha.600',
                      'whiteAlpha.600'
                    )}
                    type='text'
                    name='address'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                  <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>
                {/* CITY */}
                <FormControl isInvalid={errors.city && touched.city}>
                  <FormLabel htmlFor='city'>City</FormLabel>
                  <Input
                    borderColor={useColorModeValue(
                      'blackAlpha.600',
                      'whiteAlpha.600'
                    )}
                    type='text'
                    name='city'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                  />
                  <FormErrorMessage>{errors.city}</FormErrorMessage>
                </FormControl>
                {/* POSTAL CODE */}
                <FormControl
                  isInvalid={errors.postalCode && touched.postalCode}
                >
                  <FormLabel htmlFor='postalCode'>Postal Code</FormLabel>
                  <Input
                    borderColor={useColorModeValue(
                      'blackAlpha.600',
                      'whiteAlpha.600'
                    )}
                    type='text'
                    name='postalCode'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postalCode}
                  />
                  <FormErrorMessage>{errors.postalCode}</FormErrorMessage>
                </FormControl>
                {/* COUNTRY */}
                <FormControl isInvalid={errors.country && touched.country}>
                  <FormLabel htmlFor='country'>Country</FormLabel>
                  <Input
                    borderColor={useColorModeValue(
                      'blackAlpha.600',
                      'whiteAlpha.600'
                    )}
                    type='text'
                    name='country'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                  />
                  <FormErrorMessage>{errors.country}</FormErrorMessage>
                </FormControl>
                <Button
                  border={useColorModeValue(
                    '1px solid black',
                    '1px solid white'
                  )}
                  width='100%'
                  mt={5}
                  type='submit'
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Box
          backgroundColor={useColorModeValue(
            'blackAlpha.50',
            'whiteAlpha.50'
          )}
          w='30%'
          h='500px'
        ></Box>
      </Stack>
    </Layout>
  );
};

export default Checkout;
