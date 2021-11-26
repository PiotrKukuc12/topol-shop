import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  Edit,
  SimpleForm,
  NumberInput,
  TextInput,
  DateInput,
  Create,
  SimpleList,
} from 'react-admin';
import Upload from '../upload';

const width = window.innerWidth;

const productFilter = [<TextInput source='q' label='Search' alwaysOn />];

export const ProductsList = (props) => (
  <List filters={productFilter} {...props}>
    {width >= 855 ? (
      <Datagrid rowClick='edit'>
        <TextField source='id' />
        <TextField source='name' />
        <TextField source='category' />
        <NumberField source='countInStock' />
        <NumberField source='price' />
        <DateField source='createdAt' />
        <EditButton />
      </Datagrid>
    ) : (
      <SimpleList
        primaryText={(record) => record.name}
        secondaryText={(record) => record.price}
        tertiaryText={(record) => record.countInStock}
      />
    )}
  </List>
);

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source='name' />
      <TextInput source='category' />
      <TextInput source='images.image1' />
      <TextInput source='images.image2' />
      <TextInput source='images.image3' />
      <TextInput source='images.image4' />
      <NumberInput source='price' />
      <TextInput source='description' />
      <TextInput source='size' />
      <TextInput source='dimensions' />
      <TextInput source='materials' />
      <DateInput source='createdAt' />
      <DateInput source='updatedAt' />
      <TextInput source='id' disabled />
    </SimpleForm>
  </Edit>
);

export const CreateProduct = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='name' />
      <TextInput source='category' />
      <NumberInput source='price' />
      <TextInput source='description' />
      <TextInput source='size' />
      <TextInput source='dimensions' />
      <TextInput source='materials' />
      <TextInput source='images.image1' />
      <TextInput source='images.image2' />
      <TextInput source='images.image3' />
      <TextInput source='images.image4' />
      <Upload />
    </SimpleForm>
  </Create>
);
