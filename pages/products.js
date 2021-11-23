import {
  Stack,
  Accordion,
  Box,
  Text,
  Button,
  Heading,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Wrap,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useState } from 'react';
import Layout from '../components/Layout/layout';
import db from '../libs/db';
import Product from '../models/Products';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import ProductCart from '../components/products/product-cart';
import { useRouter } from 'next/dist/client/router';

const PAGE_SIZE = 6;

const Prods = (props) => {
  const router = useRouter();
  const toast = useToast();
  const [price, setPrice] = useState([0, 700]);
  const { categories, countProducts, products, pages } = props;

  console.log(pages)

  const filterSearch = ({ page, category, min, max,sort, price }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (category) query.category = category;
    if (sort) query.sort = sort;
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
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const priceHandler = (e) => {
    filterSearch({ price: `${price[0]}-${price[1]}` });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };

  const showPriceHandler = (e) => {
    setPrice(e);
  };

  return (
    <Layout title='Products'>
      <Stack
        position='relative'
        align={{ base: 'center', lg: 'normal' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Stack
          pb={2}
          border={useColorModeValue('1px solid black', '1px solid white')}
          my={5}
          borderRadius='10px'
          w={{ base: '70%', lg: '300px' }}
          height={{ base: '', lg: '500px' }}
          marginLeft={5}
          align='center'
        >
          <Heading>Filter by</Heading>
          <Accordion w='95%' mt={5} allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Heading fontSize='2xl'>Category</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Stack align='start'>
                  <Button
                    fontWeight='normal'
                    variant='link'
                    value='all'
                    onClick={categoryHandler}
                  >
                    All
                  </Button>
                  {categories.map((item) => (
                    <Button
                      pl={2}
                      key={item}
                      fontWeight='normal'
                      variant='link'
                      value={item}
                      onClick={categoryHandler}
                    >
                      {item}
                    </Button>
                  ))}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading fontSize='2xl'>Sort by</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Stack align='flex-start'>
                  <Button
                    onClick={sortHandler}
                    value='featured'
                    fontWeight='normal'
                    variant='link'
                  >
                    Featured
                  </Button>

                  <Button
                    onClick={sortHandler}
                    value='lowest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Price: Low to High
                  </Button>
                  <Button
                    onClick={sortHandler}
                    value='highest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Price: High to Low
                  </Button>
                  <Button
                    onClick={sortHandler}
                    value='newest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Newest Arrivals
                  </Button>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Heading fontSize='2xl'>Price</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Box>
                  <RangeSlider
                    size='lg'
                    aria-label={['min', 'max']}
                    defaultValue={[0, 600]}
                    // onChangeEnd={priceHandler}
                    onChange={showPriceHandler}
                    max={700}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <Stack mt={5} direction='row' justifyContent='space-between'>
                    <Text>{price[0]} $</Text>
                    <Text>{price[1]} $</Text>
                  </Stack>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button w='90%' onClick={priceHandler}>
            Filtr
          </Button>
        </Stack>
        <Wrap pb={50} width='100%' justify='center' spacing={0}>
          {products.map((item) => (
            <ProductCart
              name={item.name}
              price={item.price}
              image={item.image}
              id={item._id}
            />
          ))}
        </Wrap>
      </Stack>
      <Box mb='10px' w='100vw' justifyContent='center' align='center'>
        <IconButton mr={10} icon={<ArrowLeftIcon />} />
        <IconButton icon={<ArrowRightIcon />} />
      </Box>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  await db.Connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const sort = query.sort || '';
  const page = query.page || 1;
  const category = query.category || '';
  const price = query.price || '';

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
      : sort === 'toprated'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const productDocs = await Product.find({
    ...categoryFilter,
    ...priceFilter,
  })
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...categoryFilter,
    ...priceFilter,
  });

  await db.Disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      categories,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    },
  };
}

export default Prods;
