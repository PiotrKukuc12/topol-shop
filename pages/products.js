import {
  Heading,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  Box,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import Layout from '../components/Layout/layout';
import Image from 'next/image';
import NextLink from 'next/link';
import db from '../libs/db';
import Product from '../models/Products';
import { useColorModeValue } from '@chakra-ui/color-mode';

const Categories = ['Hoodies', 'T-shirt', 'Pants', 'Shoes', 'Accessories'];

const Products = (props) => {
  const { products } = props;
  return (
    <Layout title='Products'>
      <Stack direction={{ base: 'column', md: 'row' }} width='100vw'>
        <Stack w='150px' height={{ base: '', lg: '500px' }} align='center'>
          <Box display={{ base: 'none', md: 'inline-block' }}>
            <Heading fontSize='xl' mt={5}>
              Categories
            </Heading>
            <UnorderedList>
              {Categories.map((item) => (
                <ListItem key={item}>
                  <Text>{item}</Text>
                </ListItem>
              ))}
            </UnorderedList>
            <Heading fontSize='xl' mt={5}>
              Sort by
            </Heading>
            <UnorderedList>
              <ListItem>Descending</ListItem>
            </UnorderedList>
          </Box>
        </Stack>
        <SimpleGrid
          pt={5}
          px={10}
          width='100%'
          minChildWidth={{ base: '120px', md: '200px', lg: '250px' }}
          spacingY={8}
          columns={4}
        >
          {products.map((item) => (
            <div key={item._id}>
              <NextLink href={`/product/${item._id}`}>
                <Stack
                  _hover={{
                    transform: 'scale(1.02)',
                    transition: 'transform .2s ease',
                  }}
                  key={item.name}
                  cursor='pointer'
                  backgroundColor={useColorModeValue('white', 'gray.700')}
                  border={useColorModeValue('1px solid black', '')}
                  borderRadius='10px'
                  width={{ base: '110px', md: '200px', lg: '250px' }}
                  height={{ base: '240px', md: '340px', lg: '340px' }}
                  // boxShadow='8px 8px 24px 0px rgba(66, 68, 90, 1)'
                >
                  <Box align='center' mt={5}>
                    <Image src={item.image} height={220} width={220} />
                  </Box>
                  <Stack direction='column' pl={2}>
                    <Stack direction='column'>
                      <Text
                        fontSize='md'
                        fontWeight='medium'
                        color={useColorModeValue(
                          'blackAlpha.900',
                          'whiteAlpha.900'
                        )}
                      >
                        {item.name}
                      </Text>
                      <Text
                        fontSize='md'
                        fontWeight='bold'
                        color={useColorModeValue(
                          'blackAlpha.700',
                          'whiteAlpha.700'
                        )}
                      >
                        ${item.price}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </NextLink>
            </div>
          ))}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
};

export async function getServerSideProps() {
  await db.Connect();
  const products = await Product.find({}).lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

export default Products;
