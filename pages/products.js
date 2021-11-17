import {
  Stack,
  Accordion,
  Box,
  Text,
  Button,
  Heading,
  Checkbox,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Wrap,
  WrapItem,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout/layout';
import axios from 'axios';
import db from '../libs/db';
import Product from '../models/Products';
import NextLink from 'next/link';
import ReactPaginate from 'react-paginate';

const n = 6;

const Prods = (props) => {
  const [price, setPrice] = useState([0, 700]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const { categories } = props;

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get('api/admin/products?_start=0&_end=10');
      setItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const showPriceHandler = (e) => {
    setPrice(e);
  };

  return (
    <Layout title='Products'>
      <Stack align={{base: 'center', lg: 'normal'}} direction={{ base: 'column', lg: 'row' }}>
        <Stack
          border='1px solid white'
          mt={5}
          w={{ base: '70%', lg: '300px' }}
          height={{ base: '', lg: '500px' }}
          marginLeft={2}
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
                <Stack>
                  {categories.map((item) => (
                    <Checkbox
                      key={item}
                      fontWeight='normal'
                      variant='link'
                      value={item}
                      //   onChange={categoryHandler}
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
                    // onClick={sortHandler}
                    value='highest'
                    fontWeight='normal'
                    variant='link'
                  >
                    Highest
                  </Button>

                  <Button
                    // onClick={sortHandler}
                    value='lowest'
                    ml={2}
                    fontWeight='normal'
                    variant='link'
                  >
                    Lowest
                  </Button>
                  <Button
                    // onClick={sortHandler}
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
        </Stack>
        {loading ? (
          <Wrap width='100%' justify='center' spacing={0}>
            {[...Array(n)].map((e, i) => (
              <WrapItem p={3} key={i}>
                <Stack>
                  <Skeleton w={340} h={340}></Skeleton>
                  <Skeleton w={60} h={5}></Skeleton>
                  <Skeleton w={20} h={5}></Skeleton>
                </Stack>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Wrap width='100%' justify='center' spacing={0}>
            {items.map((item) => (
              <WrapItem
                position='relative'
                cursor='pointer'
                p={3}
                key={item.id}
              >
                <NextLink href={`/product/${item.id}`}>
                  <Stack spacing={0}>
                    <Box opacity={1}>
                      <Image src={item.image} width={340} height={340} />
                    </Box>
                    <Box
                      _hover={{
                        opacity: '1',
                        transition:'.4s ease opacity'
                      }}
                      opacity={0}
                      transition= '.4s ease opacity'
                      position='absolute'
                    >
                      <Image src='/images/sgir.jpg' width={340} height={340} />
                    </Box>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                  </Stack>
                </NextLink>
              </WrapItem>
            ))}
            <Box w='100%' display='flex' justifyContent='center' align='center'>
              <ReactPaginate />
            </Box>
          </Wrap>
        )}
      </Stack>
    </Layout>
  );
};

export async function getStaticProps() {
  db.Connect();
  const categories = await Product.find().distinct('category');
  db.Disconnect();

  return {
    props: {
      categories: categories,
    },
  };
}

export default Prods;
