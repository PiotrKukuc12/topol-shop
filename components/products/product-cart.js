import { WrapItem, Stack, Box, Text } from '@chakra-ui/layout';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ProductCart = ({ name, price, id, images }) => {
  return (
    <WrapItem
      key={id}
      position='relative'
      cursor='pointer'
      p={{ base: '0', md: '2' }}
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.1, 0.01, -0.05, 0.9] }}
      >
        <NextLink href={`/product/${id}`}>
          <Stack spacing={0}>
            <Box
              opacity={1}
              w={{ base: '100%', md: '250px', lg: '340px' }}
              h={{ base: '160px', md: '250px', lg: '340px' }}
              position='relative'
            >
              <Image src={images.image1} layout='fill' alt={name} />
            </Box>
            <Box
              _hover={{
                opacity: '1',
                transition: '.4s ease opacity',
              }}
              opacity={0}
              transition='.4s ease opacity'
              position='absolute'
              w={{ base: '100%', md: '250px', lg: '340px' }}
              h={{ base: '160px', md: '250px', lg: '340px' }}
            >
              <Image src={images.image2} layout='fill' alt={name} />
            </Box>
            <Box pl={3}>
              <Text fontSize='sm' width='150px'>
                {name}
              </Text>
              <Text fontSize='md'>$ {price}</Text>
            </Box>
          </Stack>
        </NextLink>
      </motion.div>
    </WrapItem>
  );
};

export default dynamic(() => Promise.resolve(ProductCart), {
  ssr: true,
});
