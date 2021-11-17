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
  IconButton,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout/layout';
import axios from 'axios';
import db from '../libs/db';
import Product from '../models/Products';
import NextLink from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const n = 6;

const Prods = (props) => {
  const toast = useToast();
  const [price, setPrice] = useState([0, 700]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const { categories, length } = props;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const [queries, setQueries] = useState('')
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `api/admin/products?_start=${start}&_end=${end}?${queries}`
        );
        setItems(data);
        setLoading(false);
      };
      fetchData();
    }, [start, queries]);
    
    const showPriceHandler = (e) => {
      setPrice(e);
    };
    
    const handleQueries = () => {
      setQueries(`&price=${price[0]}-${price[1]}`)
    }

  const handlePageUp = () => {
    if (end + 5 > length) {
      setEnd(length);
      setStart(length - 5);
    }
    if (end === length) {
      toast({
        title: 'No more items in store',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
    if (end + 5 < length) {
      setStart(start + 5);
      setEnd(end + 5);
    }
  };

  const handlePageDown = () => {
    if (start - 5 <= 0) {
      setStart(0);
      setEnd(5);
    }
    if (start === 0 && end === 5) {
      toast({
        title: 'You cant go back',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <Layout title='Products'>
      <Stack
        align={{ base: 'center', lg: 'normal' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Stack
          border={useColorModeValue('1px solid black', '1px solid white')}
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
                  <Button w='90%' onClick={handleQueries}>Filtr</Button>
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
          <Wrap pt={5} width='100%' justify='center' spacing={0}>
            {items.map((item) => (
              <WrapItem
                position='relative'
                cursor='pointer'
                p={{base:'0', md:'2'}}
                key={item.id}
              >
                <NextLink href={`/product/${item.id}`}>
                  <Stack spacing={0}>
                    <Box
                      opacity={1}
                      w={{ base: '130px', md: '250px', lg: '340px' }}
                      h={{base: '130px', md:'250px',lg:'340px'}}
                      position='relative'
                    >
                      <Image src={item.image} layout='fill' />
                    </Box>
                    <Box
                      _hover={{
                        opacity: '1',
                        transition: '.4s ease opacity',
                      }}
                      opacity={0}
                      transition='.4s ease opacity'
                      position='absolute'
                      w={{ base: '130px', md: '250px', lg: '340px' }}
                      h={{base: '130px', md:'250px',lg:'340px'}}
                    >
                      <Image src='/images/sgir.jpg' layout='fill' />
                    </Box>
                    <Text fontSize='sm' width='150px'>{item.name}</Text>
                    <Text>{item.price}</Text>
                  </Stack>
                </NextLink>
              </WrapItem>
            ))}
            <Box
              py={5}
              w='100%'
              display='flex'
              justifyContent='center'
              align='center'
            >
              {/* <ArrowLeftIcon /> */}
              <IconButton
                onClick={handlePageDown}
                mx={2}
                icon={<ArrowLeftIcon />}
              />
              <Button>1</Button>
              <Button mx={2}>2</Button>
              <Button>3</Button>
              <IconButton
                onClick={handlePageUp}
                mx={2}
                icon={<ArrowRightIcon />}
              />
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
  const productsLength = await Product.countDocuments();
  db.Disconnect();

  return {
    props: {
      categories: categories,
      length: productsLength,
    },
  };
}

export default Prods;
