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
  ReferenceInput,
  SimpleList
} from 'react-admin';

const width = window.innerWidth
console.log(width)

const productFilter = [
  <TextInput source="q" label="Search" alwaysOn />
]

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
      primaryText={record=> record.name}
      secondaryText={record=> record.price}
      tertiaryText={record=> record.countInStock}
    />
  )}
  </List>
);

export const ProductEdit = props => (
  <Edit {...props}>
      <SimpleForm>
          <TextInput disabled source="id" />
          <TextInput source="name" />
          <TextInput source="category" />
          <NumberInput source="countInStock" />
          <NumberInput source="price" />
          <TextInput disabled source="image" />
          <TextInput source="description" />
          <DateInput source="createdAt" />
          <DateInput source="updatedAt" />
      </SimpleForm>
  </Edit>
);

export const CreateProduct = props => (
  <Create {...props}>
      <SimpleForm>
          <TextInput source="name" />
          <TextInput source="category" />
          <NumberInput source="countInStock" />
          <NumberInput source="price" />
          <TextInput source="image" />
          <TextInput source="description" />
      </SimpleForm>
  </Create>
);