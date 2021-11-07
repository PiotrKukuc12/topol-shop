import { Container, Stack, Box, Text, Heading, Button } from '@chakra-ui/react';
import Layout from '../../components/Layout/layout';
import db from '../../libs/db';
import Product from '../../models/Products';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { Store } from '../../libs/Store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const text1 = ' lorem ipsum material';
const text2 = ' lorem ipsum wymiary';

const ProductDetails = (props) => {
  const { product } = props;
  const [textDetails, setTextDetails] = useState(true);

  const { dispatch, state } = useContext(Store);

  if (!product) {
    return <div> 404 Product not found </div>;
  }

  const addToBagHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = existItem ? existItem + 1 : 1;
    const { data } = await axios.get(`/api/product/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Product is out of stock.');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Item added to bag.');
  };

  return (
    <Layout title='Details'>
      <ToastContainer position='bottom-right' />
      <Box width='98vw' mt={10}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent='space-around'
        >
          <Box align='center'>
            <Image src={product.image} width={640} height={640} />
          </Box>
          <Stack align={{base:'center',lg:'baseline'}} w={{ base: '90%', lg: '400px' }}>
            <Heading fontSize='6xl'>{product.name}</Heading>
            <Heading fontSize='2xl'>$ {product.price}</Heading>
            <Text fontSize='lg'>Size: xl </Text>
            <Text pt={10} px={{base: '10', lg:'0'}} color='gray.500'>
              {product.description}
            </Text>
            <Button onClick={addToBagHandler} width='90%'>Add to bag</Button>

            <Stack direction='column' pt={20}>
              <Box>
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
              <Box pt={5}>
                {textDetails === true ? (
                  <Text>{text1}</Text>
                ) : (
                  <Text>{text2}</Text>
                )}
              </Box>
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
