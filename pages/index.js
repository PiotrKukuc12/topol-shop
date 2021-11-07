import { Box, Stack, Text, Heading, Button } from '@chakra-ui/react';
import Layout from '../components/Layout/layout';

const Index = () => {
  return (
    <Layout title='Home'>
      <Box bgGradient="linear(to-t, blackAlpha.700, blackAlpha.800)" width='100vw' height='90vh'>
        <Stack spacing={5} pt={100} px={20}>
          <Text fontSize='lg' color='whiteAlpha.700'>
            Case study
          </Text>
          <Heading fontSize={{base:'3xl',lg:'4xl'}} color='whiteAlpha.900'>
            Aesthetic. Minimalist. Rebel.
          </Heading>
          <Text color='whiteAlpha.700' fontSize={{base: 'md', md:'xl'}}>
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
    </Layout>
  );
};

export default Index;
