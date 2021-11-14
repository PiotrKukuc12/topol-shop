import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ArrayField,
  SingleFieldList,
  ChipField,
  BooleanField,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  NumberInput,
  DateInput,
} from 'react-admin';


export const OrderList = (props) => (
  <List {...props}>
    <Datagrid rowClick='edit'>
      <TextField source='shippingAddress.fullName' label='Full Name' />
      <TextField source='shippingAddress.address' label='Address' />
      <TextField source='paymentResult.id' label='Payment id' />
      <BooleanField source='isPaid' label='Paid' />
      <BooleanField source='isDelivered' label='Delivered' />
      <ArrayField source='orderItems'>
        <SingleFieldList>
          <ChipField source='name' />
        </SingleFieldList>
      </ArrayField>
      <TextField source='paymentMethod' />

      <NumberField source='totalPrice' />
      <DateField source='createdAt' />
    </Datagrid>
  </List>
);

export const OrderEdit = (props) => (
  <>
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source='shippingAddress.fullName' />
        <TextInput disabled source='paymentResult.id' />
        <BooleanInput disabled source='isPaid' />
        <BooleanInput source='isDelivered' />
        <ArrayInput source='orderItems'>
          <SimpleFormIterator>
            <TextInput source='name' />
            <TextInput source='image' />
            <NumberInput source='price' />
            <NumberInput source='quantity' />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source='paymentMethod' />
        <TextInput source='deliveryMethod' />
        <TextInput source='percelAddress' />
        <NumberInput source='itemsPrice' />
        <NumberInput source='shippingPrice' />
        <NumberInput source='totalPrice' />
        <DateInput source='createdAt' />

      </SimpleForm>
    </Edit>
  </>
);

