import { useEffect, useState } from 'react';
import Layout from '../components/Layout/layout';
import Head from 'next/head';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const script = `
window.easyPackAsyncInit = function () {
  easyPack.init({
    mapType: 'osm',
    searchType: 'osm',
  });
  const map = easyPack.mapWidget('easypack-map', function(point) {
    let date= new Date()
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = "percelAddress" + "=" + point.name + "; " + expires + "; path=/";
    document.getElementById('percel_name').innerHTML = " <br /> " +point.address.line2 + "<br /> " + point.address.line1
  });
};
`;

const Selectparcel = () => {
  const [percel, setPercel] = useState('');
  const per = Cookies.get('percelAddress');
  const router = useRouter()

  useEffect(() => {
    setPercel(per);
  }, [per]);
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
        />
        <meta http-equiv='x-ua-compatible' content='IE=11' />
        <link
          href='https://geowidget.easypack24.net/css/easypack.css'
          rel='stylesheet'
        ></link>
        <script src='https://geowidget.easypack24.net/js/sdk-for-javascript.js'></script>
        <script type='text/javascript'>{script}</script>
      </Head>
      <Layout title='ParcelSelect'>
        <Stack align='center' mt={10} direction={{ base: 'column', lg: 'row' }}>
          <Box
            borderRadius='10px'
            w={{ base: '80%', lg: '60%' }}
            h='700px'
            backgroundColor='whiteAlpha.900'
            mx={10}
            p={10}
          >
            <div id='easypack-map'></div>
          </Box>
          <Box mt={10}>
            <Box>
              <Text>Current Percel:</Text>

              <div id='percel_name'></div>
            </Box>
          </Box>
          <Box>
            <Button onClick={() => router.push('/ordertype')}>Back</Button>
            <Button onClick={() => console.log(percel)}>Submit</Button>
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default Selectparcel;
