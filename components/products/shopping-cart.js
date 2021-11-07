import { Stack, Box, Text, Button, IconButton, Divider } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import Image from 'next/image';
import {DeleteIcon} from '@chakra-ui/icons';
import {Store} from '../../libs/Store'
import { useContext } from 'react';


const ShoppingCart = ({ item }) => {
    const { state, dispatch } = useContext(Store)
    const handleDeleteButton = (id) => {
        dispatch({ type: 'CART_DELETE_ITEM', payload: item._id})
    }
  return (
      <div key={item._id}>
    <Stack ml={5} direction='row' mt={5}>
      <Box>
        <Image
          src={item.image}
          alt={item.title}
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
        <Select value='1' width='70px'>
            <option value='option1'>1</option>
            <option value='option1'>2</option>
            <option value='option1'>3</option>
        </Select>
      </Stack>
    </Stack>
      <Divider pt={2} mx={5} />
      </div>
  );
};

export default ShoppingCart;
