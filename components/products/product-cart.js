import { WrapItem, Stack, Box, Text } from '@chakra-ui/layout';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ProductCart = ({ name, price, id, image }) => {
  return (
    <WrapItem
      key={id}
      position='relative'
      cursor='pointer'
      p={{ base: '0', md: '2' }}
    >
      <NextLink href={`/product/${id}`}>
        <Stack spacing={0}>
          <Box
            opacity={1}
            w={{ base: '130px', md: '250px', lg: '340px' }}
            h={{ base: '130px', md: '250px', lg: '340px' }}
            position='relative'
          >
            <Image src={image} layout='fill' alt={name} />
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
            h={{ base: '130px', md: '250px', lg: '340px' }}
          >
            <Image src='/images/sgir.jpg' layout='fill' alt={name} />
          </Box>
          <Text fontSize='sm' width='150px'>
            {name}
          </Text>
          <Text>{price}</Text>
        </Stack>
      </NextLink>
    </WrapItem>
  );
};

export default dynamic(() => Promise.resolve(ProductCart), {
  ssr: true,
});
