import {
  Heading,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  Box,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import Layout from '../components/Layout/layout';
import Image from 'next/image';
import NextLink from 'next/link';
import db from '../libs/db';
import Product from '../models/Products';
import { useContext, useState } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import InfiniteScroll from 'react-infinite-scroll-component';
import dynamic from 'next/dynamic';

const Categories = ['Hoodies', 'T-shirt', 'Pants', 'Shoes', 'Accessories'];

const Products = (props) => {
  const { products, leng } = props;

  const [items, setItems] = useState(products);

  const getMorePost = async () => {
    const res = await fetch(`/api/products?_skip=${items.length}&_limit=10`);
    const newPosts = await res.json();
    setItems((post) => [...post, ...newPosts]);
  };

  return (
    <Layout title='Products'>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Stack
          w='150px'
          height={{ base: '', lg: '500px' }}
          marginLeft={2}
          align='center'
        >
          <Box>
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

        <InfiniteScroll
          dataLength={leng}
          next={getMorePost}
          hasMore={leng !== items.length ? true : false}
          loader={
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
              align='center'
              justifyContent='center'
              margin={10}
            />
          }
          endMessage={<h4 style={{ width: '100%' }}>No more</h4>}
          style={{
            marginLeft: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            width: '85vw',
            justifyContent: 'center',
          }}
        >
          {items.map((item) => (
            <div key={item._id}>
              <NextLink href={`/product/${item._id}`}>
                  <Stack
                    _hover={{
                      transform: 'scale(1.02)',
                      transition: 'transform .2s ease',
                    }}
                    key={item.name}
                    cursor='pointer'
                    marginTop={5}
                    marginX={1.5}
                    backgroundColor={useColorModeValue(
                      'white',
                      'whiteAlpha.50'
                    )}
                    border={useColorModeValue('1px solid black', '')}
                    borderRadius='10px'
                    width={{ base: '128px', md: '200px', lg: '250px' }}
                    height={{ base: '240px', md: '300px', lg: '340px' }}
                    // boxShadow='8px 8px 24px 0px rgba(66, 68, 90, 1)'
                  >
                <Tooltip placement='auto' label={item.name}>

                    <Box align='center' mt={5}>
                    
                      <Image src={item.image} height={220} width={220} />
                    </Box>
                    </Tooltip>
                    <Stack direction='column' pl={2}>
                      <Stack direction='column'>
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight='medium'
                          color={useColorModeValue(
                            'blackAlpha.900',
                            'whiteAlpha.900'
                          )}
                        >
                          {item.name}
                        </Text>
                        <Text
                          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                          fontWeight='medium'
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
        </InfiniteScroll>
      </Stack>
    </Layout>
  );
};

export async function getServerSideProps() {
  await db.Connect();
  const products = await Product.find({}, null, { limit: 10 }).lean();
  const leng = await Product.count();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      leng: leng,
    },
  };
}

export default dynamic(() => Promise.resolve(Products), { ssr: false });
