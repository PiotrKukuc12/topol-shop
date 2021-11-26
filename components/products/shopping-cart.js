import {
  Stack,
  Box,
  Text,
  Button,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import Image from 'next/image';
import { DeleteIcon } from '@chakra-ui/icons';
import { Store } from '../../libs/Store';
import { useContext } from 'react';
import axios from 'axios';

const ShoppingCart = ({ item }) => {
  const { state, dispatch } = useContext(Store);
  const handleDeleteButton = (id) => {
    dispatch({ type: 'CART_DELETE_ITEM', payload: item._id });
  };

  const updateCart = async (item) => {
    const { data } = await axios.get(`/api/product/${item._id}`);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item } });
  };
  return (
    <div key={item._id}>
      <Stack ml={5} direction='row' mt={5}>
        <Box>
          <Image  
            src={item.images.image1}
            alt={item.title}
            placeholder='blur'
            blurDataURL='/images/placeholderimage.png'
            width={120}
            objectFit='cover'
            height={130}
          />
        </Box>
        <Stack direction='column' width='55%'>
          <Stack direction='row' justifyContent='space-between'>
            <Text fontSize='medium'>{item.name}</Text>
            <IconButton onClick={handleDeleteButton} icon={<DeleteIcon />} />
          </Stack>
          <Text py={0}>${item.price}</Text>
        </Stack>
      </Stack>
      <Divider pt={2} mx={5} />
    </div>
  );
};

export default ShoppingCart;
