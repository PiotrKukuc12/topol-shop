import { Box, Stack, Text, Heading, Button } from '@chakra-ui/react';
import Layout from '../components/Layout/layout';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <Layout title='Home'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Box
          bgGradient='linear(to-t, blackAlpha.700, blackAlpha.800)'
          width='100vw'
          height='95vh'
        >
          <Stack spacing={5} pt={100} px={20}>
            <Text fontSize='lg' data-testid='test-1' color='whiteAlpha.700'>
              Case study
            </Text>
            <Heading
              fontSize={{ base: '3xl', lg: '4xl' }}
              color='whiteAlpha.900'
            >
              Aesthetic. Minimalist. Rebel.
            </Heading>
            <Text
              as='h1'
              color='whiteAlpha.700'
              fontSize={{ base: 'md', md: 'xl' }}
            >
              A new minimalist streetwear brand builr entirely from scratch.{' '}
              <br /> From naming to the veri fist collection.
            </Text>
            <Stack direction='row'>
              <Button width='100px'> Contact </Button>
              <Button width='100px'> About </Button>
              <Button width='100px'> Politics </Button>
            </Stack>
          </Stack>
        </Box>
      </motion.div>
    </Layout>
  );
};

export default Index;
