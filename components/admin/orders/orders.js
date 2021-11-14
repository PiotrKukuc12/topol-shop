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

    <div>
Hello edit order
    </div>
  
);
