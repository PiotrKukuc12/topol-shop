import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';


import { useState } from 'react';

const Upload = () => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const token = Cookies.get('token')
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      setLoading(true);
      const { data } = await axios.post('api/admin/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      setImage(data.secure_url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Box m={20}>
      <Button as="label" isLoading={loading} style={{cursor:'pointer'}}>
          upload
        <input type='file' hidden onChange={uploadHandler} />
      </Button>
        {image ? (
          <Image src={image} width={120} height={120} />
        ) : (
          <div>Nothing here</div>
        )}
        {image}
      </Box>
    </>
  );
};

export default Upload;
