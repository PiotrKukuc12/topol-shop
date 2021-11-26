import { Stack, Box, Text, Heading, Button, useToast } from '@chakra-ui/react';
import Layout from '../../components/Layout/layout';
import db from '../../libs/db';
import Product from '../../models/Products';
import { useContext, useState } from 'react';
import { Store } from '../../libs/Store';
import ImageCarousel from '../../components/products/carousel';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const ProductDetails = (props) => {
  const toast = useToast();
  const { product } = props;
  const [textDetails, setTextDetails] = useState(true);

  const { dispatch } = useContext(Store);

  if (!product) {
    return <div> 404 Product not found </div>;
  }


  const addToBagHandler = async () => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        image: product.images.image1,
      },
    });
    toast({
      position: 'top-left',
      title: 'Item added to bag',
      status: 'success',
      duration: '3000',
      isClosable: true,
    });
  };

  return (
    <Layout title='Details'>
      <Box width='98vw' mt={10}>
        <NextLink href='/products'>
          <Button ml={10} mb={6} variant='link'>
            <ArrowBackIcon w={8} h={8} />
            <Text fontSize='xl'>Back to shopping</Text>
          </Button>
        </NextLink>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent='space-around'
        >
          <Box align='center'>
            <ImageCarousel images={product.images} />
          </Box>
          <Stack w={{ base: '90%', lg: '400px' }}>
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              textAlign={{ base: 'left', md: 'center' }}
              ml={{ base: '8', md: '0' }}
              mt={{ base: '5', md: '0' }}
            >
              {product.name}
            </Heading>
            <Text
              align={{ base: 'left', md: 'center' }}
              pl={{ base: '8', md: '0' }}
              fontSize='lg'
            >
              Size: {product.size}
            </Text>
            <Text
              pt={3}
              px={{ base: '10', md: '10%', lg: '0' }}
              color='gray.500'
            >
              {product.description}
            </Text>
            <Box pt={5} w={{ base: '100vw', lg: '100%' }} align='center'>
              <Button
                mr={10}
                onClick={() => setTextDetails(true)}
                variant='outline'
              >
                Materials
              </Button>
              <Button onClick={() => setTextDetails(false)} variant='outline'>
                Dimensions
              </Button>
            </Box>
            <Box py={5}>
              {textDetails === false ? (
                <Text
                  align='center'
                  px={{ base: '10', lg: '0' }}
                  color='gray.500'
                >
                  {product.dimensions}
                </Text>
              ) : (
                <Text
                  align='center'
                  px={{ base: '10', lg: '0' }}
                  color='gray.500'
                >
                  {product.materials}
                </Text>
              )}
            </Box>
            <Stack pb={5} direction='row' justifyContent='space-around'>
              <Heading pl={10} fontSize='3xl'>
                $ {product.price}
              </Heading>
              <Button onClick={addToBagHandler} width='50%'>
                Add to bag
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { id } = params;
    await db.Connect();
    const product = await Product.findOne({ _id: id }).lean();

    return {
      props: {
        product: db.convertDocToObj(product),
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
      },
    };
  }
}

export default ProductDetails;
