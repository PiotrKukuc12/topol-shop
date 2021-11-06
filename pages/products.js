import {
  Heading,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import Layout from '../components/Layout/layout';
import Image from 'next/image';
import NextLink from 'next/link';
import db from '../libs/db';
import Product from '../models/Products';
import { useContext, useState } from 'react';
import {Store} from '../libs/Store'
import { useColorModeValue } from '@chakra-ui/color-mode';
import InfiniteScroll from "react-infinite-scroll-component";

const Categories = ['Hoodies', 'T-shirt', 'Pants', 'Shoes', 'Accessories'];

const Products = (props) => {
  const { products } = props;
  const [posts, setPosts] = useState(products);
  const [hasMore, setHasMore] = useState(true);

  const { state, dispatch } = useContext(Store)

  const getMorePost = async () => {
    const res = await fetch(
      `http://localhost:3000/api/products?_skip=${products.length}&_limit=4`
    )
    const newPosts = await res.json()
    setPosts((post)=> [...post, ...newPosts])
  }

  return (
    <Layout title='Products'>
      <Stack direction={{ base: 'column', md: 'row' }} width='100vw'>
        <Stack w='150px' height={{ base: '', lg: '500px' }} align='center'>
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
        {/* <SimpleGrid
          pt={5}
          px={{base:3, md:5, lg:10}}
          width='100%'
          spacingY={8}
          minChildWidth={{ base: '140px', md: '200px', lg: '250px' }}
          columns={{base:2 , md:4, lg:5}}
        > */}

        {/* make an infinite scroll a grid box somehow */}

        <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3>Loading...</h3>}
        endMessage={<h4>No more</h4>}
        >

          {posts.map((item) => (
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
                  width={{ base: '140px', md: '200px', lg: '250px' }}
                  height={{ base: '240px', md: '300px', lg: '340px' }}
                  // boxShadow='8px 8px 24px 0px rgba(66, 68, 90, 1)'
                >
                  <Box align='center' mt={5}>
                    <Image src={item.image} height={220} width={220} />
                  </Box>
                  <Stack direction='column' pl={2}>
                    <Stack direction='column'>
                      <Text
                        fontSize={{base:'sm', md:'md'}}
                        fontWeight='medium'
                        color={useColorModeValue(
                          'blackAlpha.900',
                          'whiteAlpha.900'
                        )}
                      >
                        {item.name}
                      </Text>
                      <Text
                        fontSize={{base:'sm', md:'md', lg:'lg'}}
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
        {/* </SimpleGrid> */}
      </Stack>
    </Layout>
  );
};

export async function getServerSideProps() {
  await db.Connect();
  const products = await Product.find({}, null, { limit: 2 }).lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

export default Products;
