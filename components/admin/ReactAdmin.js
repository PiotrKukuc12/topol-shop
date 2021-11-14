import { Admin, Resource, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';
import { ProductsList, ProductEdit, CreateProduct } from './products/products';
import { CreateOrder, OrderEdit, OrderList } from './orders/orders';
import authProvider from './authProvider';

const dataProvider = simpleRestProvider('http://localhost:3000/api/admin');

const ReactAdmin = () => {
  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name='products' list={ProductsList} edit={ProductEdit} create={CreateProduct} />
      <Resource name='orders' list={OrderList} edit={OrderEdit} /> 
    </Admin>
  );
};

export default ReactAdmin;
