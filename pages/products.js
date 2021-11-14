import {
  Heading,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  Box,
  Input,
  Tooltip,
  Button,
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
import { useRouter } from 'next/dist/client/router';

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const Products = (props) => {
  const { products, leng, categories } = props;
  const router = useRouter();
  const [items, setItems] = useState(products);

  const getMorePost = async () => {
    let controller = new AbortController();
    try {
      const res = await fetch(`/api/products?_skip=${items.length}&_limit=10`, {
        signal: controller.signal,
      });
      const newPosts = await res.json();
      setItems((post) => [...post, ...newPosts]);
      controller = null;
    } catch (error) {
      console.log(error);
    }
    return () => controller?.abort();
  };

  const filterSearch = ({ category, sort, min, max, searchQuery, price }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (price) query.price = price;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      filterSearch({ searchQuery: e.target.value })
    }
  };

  return (
    <Layout title='Products'>
      <Stack data-testid='Index-1' direction={{ base: 'column', lg: 'row' }}>
        <Stack
          w={{ base: 'auto', lg: '150px' }}
          height={{ base: '', lg: '500px' }}
          marginLeft={2}
          align='center'
        >
          <Stack
            spacing={{ base: '20', lg: '0' }}
            direction={{ base: 'row', lg: 'column' }}
          >
            <Box>
              <Heading fontSize='xl' mt={5}>
                Search
              </Heading>
              <Input placeholder='Find item'   onKeyDown={searchHandler} mt={2} />
              <Heading fontSize='xl' mt={5}>
                Categories
              </Heading>
              <UnorderedList>
                <ListItem>
                  <Button
                    onClick={categoryHandler}
                    value='all'
                    fontWeight='normal'
                    variant='link'
                  >
                    All
                  </Button>
                </ListItem>
                {categories.map((item) => (
                  <ListItem key={item}>
                    <Button
                      fontWeight='normal'
                      ml={2}
                      variant='link'
                      value={item}
                      onClick={categoryHandler}
                    >
                      {item}
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box>
              <Heading fontSize='xl' mt={5}>
                Sort by
              </Heading>
              <UnorderedList>
                <ListItem>
                  <Button
                    onClick={sortHandler}
                    value='highest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Highest
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={sortHandler}
                    value='lowest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Lowest
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={sortHandler}
                    value='newest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Newest
                  </Button>
                </ListItem>
              </UnorderedList>
            </Box>
            <Box>
              <Heading fontSize='xl' mt={5}>
                Price range
              </Heading>
              <UnorderedList>
                <ListItem>
                  <Button
                    fontWeight='normal'
                    onClick={priceHandler}
                    variant='link'
                    value='all'
                  >
                    All
                  </Button>
                </ListItem>
                {prices.map((item) => (
                  <ListItem key={item.value}>
                    <Button
                      ml={2}
                      fontWeight='normal'
                      onClick={priceHandler}
                      variant='link'
                      value={item.value}
                    >
                      {item.name}
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Stack>
        </Stack>

        <InfiniteScroll
          dataLength={leng}
          next={getMorePost}
          hasMore={leng !== items.length ? true : false}
          // loader={
          //   <Box m={100}>
          //     <Spinner
          //       position='absolute'
          //       top='95%'
          //       left='50%'
          //       thickness='4px'
          //       speed='0.65s'
          //       emptyColor='gray.200'
          //       color='blue.500'
          //       size='xl'
          //       align='center'
          //       justifyContent='center'
          //       marginx='200px'
          //     />
          //   </Box>
          // }
          style={{
            marginLeft: '20px',
            display: 'flex',
            padding: '10px',
            flexWrap: 'wrap',
            width: '',
            justifyContent: 'space-between',
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
                  backgroundColor={useColorModeValue('white', 'whiteAlpha.50')}
                  border={useColorModeValue('1px solid black', '')}
                  borderRadius='10px'
                  width={{ base: '128px', md: '200px', lg: '250px' }}
                  height={{ base: '240px', md: '300px', lg: '340px' }}
                  // boxShadow='8px 8px 24px 0px rgba(66, 68, 90, 1)'
                >
                  <Tooltip placement='auto' label={item.name}>
                    <Box align='center' mt={5}>
                      <Image
                        placeholder='blur'
                        blurDataURL='images/placeholderimage.png'
                        src={item.image}
                        height={220}
                        width={220}
                      />
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

export async function getServerSideProps({ query }) {
  await db.Connect();
  const price = query.price || '';
  const category = query.category || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const categories = await Product.find().distinct('category');
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    name: { $regex: searchQuery, $options: 'i' },
    ...categoryFilter,
    ...priceFilter,
  })
    .sort(order)
    .lean();
  const leng = await Product.countDocuments();

  return {
    props: {
      categories: categories,
      products: products.map(db.convertDocToObj),
      leng: leng,
    },
  };
}

export default dynamic(() => Promise.resolve(Products), { ssr: false });
