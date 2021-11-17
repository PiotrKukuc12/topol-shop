import {
  Heading,
  Stack,
  Text,
  Box,
  Checkbox,
  Tooltip,
  Button,
  Wrap,
  WrapItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react';
import Layout from './Layout/layout';
import Image from 'next/image';
import NextLink from 'next/link';
import Product from '../models/Products';
import { useEffect, useState } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useRouter } from 'next/dist/client/router';

const categories = ['test1', 'test2']

const Products = () => {
  // const { categories } = props;
  const router = useRouter();
  // const [items, setItems] = useState(products);
  const [price, setPrice] = useState([0, 600]);

  // const filterSearch = ({ category, sort, min, max, searchQuery, price }) => {
  //   const path = router.pathname;
  //   const { query } = router;
  //   if (searchQuery) query.searchQuery = searchQuery;
  //   if (sort) query.sort = sort;
  //   if (category) query.category = category;
  //   if (price) query.price = price;
  //   if (min) query.min ? query.min : query.min === 0 ? 0 : min;
  //   if (max) query.max ? query.max : query.max === 0 ? 0 : max;

  //   router.push({
  //     pathname: path,
  //     query: query,
  //   });
  // };

  // const categoryHandler = (e) => {
  //   console.log(e.target.value);
  //   filterSearch({ category: e.target.value });
  //   // use Context to store checked data
  //   // also add option to add more then 1 category
  // };
  // const sortHandler = (e) => {
  //   filterSearch({ sort: e.target.value });
  // };
  // const priceHandler = (e) => {
  //   filterSearch({ price: `${e[0]}-${e[1]}` });
  // };

  // const showPriceHandler = (e) => {
  //   setPrice(e);
  // };



  return (
    <Layout title='Products'>
      <Stack direction={{ base: 'column', lg: 'row' }}>
        <Stack
          border='1px solid white'
          mt={5}
          w={{ base: 'auto', lg: '300px' }}
          height={{ base: '', lg: '500px' }}
          marginLeft={2}
          align='center'
        >
          <Heading fontSize='3xl' py={5}>
            Filter by
          </Heading>
          {/* <Accordion w='95%' mt={5} allowToggle>
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
                <Stack>
                  {categories.map((item) => (
                    <Checkbox
                      key={item}
                      fontWeight='normal'
                      variant='link'
                      value={item}
                      onChange={categoryHandler}
                    >
                      {item}
                    </Checkbox>
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
                    value='highest'
                    fontWeight='normal'
                    variant='link'
                  >
                    Highest
                  </Button>

                  <Button
                    onClick={sortHandler}
                    value='lowest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Lowest
                  </Button>
                  <Button
                    onClick={sortHandler}
                    value='newest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Newest
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
                    onChangeEnd={priceHandler}
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
          </Accordion> */}
        </Stack>
        {/* two scrolls? */}
        {/* <Wrap spacing={0} pt={5} width='100%'>
          {items.map((item) => (
            <WrapItem p={5} position='relative' key={item._id}>
              <NextLink href={`/product/${item._id}`}>
                  <Stack cursor='pointer' spacing={0}>
                    <Box opacity={1}>
                      <Image src={item.image} width={340} height={340} />
                    </Box>
                <Tooltip placement='auto' label={item.name}>
                    <Box
                      opacity={0}
                      _hover={{
                        opacity: '1',
                        transition: '.4s ease opacity',
                      }}
                      transition='.4s ease opacity'
                      position='absolute'
                      top={5}
                      left={19}
                    >
                      <Image src='/images/sgir.jpg' width={340} height={340} />
                    </Box>
                </Tooltip>
                    <Stack direction='column'>
                      <Text fontSize='lg'>{item.name}</Text>
                      <Text>{item.price} $</Text>
                    </Stack>
                  </Stack>
              </NextLink>
            </WrapItem>
          ))}
        </Wrap> */}
      </Stack>
    </Layout>
  );
};

// export async function getServerSideProps({ query }) {
//   await db.Connect();
//   const price = query.price || '';
//   const category = query.category || '';
//   const sort = query.sort || '';

//   const categories = await Product.find().distinct('category');
//   const categoryFilter = category && category !== 'all' ? { category } : {};
//   const priceFilter =
//     price && price !== 'all'
//       ? {
//           price: {
//             $gte: Number(price.split('-')[0]),
//             $lte: Number(price.split('-')[1]),
//           },
//         }
//       : {};

//   const order =
//     sort === 'featured'
//       ? { featured: -1 }
//       : sort === 'lowest'
//       ? { price: 1 }
//       : sort === 'highest'
//       ? { price: -1 }
//       : sort === 'newest'
//       ? { createdAt: -1 }
//       : { _id: -1 };

//   const products = await Product.find({
//     ...categoryFilter,
//     ...priceFilter,
//   })
//     .sort(order)
//     .lean();
//   const leng = await Product.countDocuments();

//   return {
//     props: {
//       categories: categories,
//       products: products.map(db.convertDocToObj),
//       leng: leng,
//     },
//   };
// }
export default Products;
