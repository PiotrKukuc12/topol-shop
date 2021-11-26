import { Admin, Resource, fetchUtils, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';
import { ProductsList, ProductEdit, CreateProduct } from './products/products';
import { CreateOrder, OrderEdit, OrderList } from './orders/orders';
import authProvider from './authProvider';
import Cookies from 'js-cookie';


const httpClient = (url, options={}) => {
  if(!options.headers){
    options.headers = new Headers({ Accept: 'application/json' })
  }
  const token  = Cookies.get('token')
  options.headers.set("Authorization", `Bearer ${token}`)
  return fetchUtils.fetchJson(url, options)
}

const dataProvider = simpleRestProvider('/api/admin', httpClient);


const ReactAdmin = () => {
  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name='products' list={ProductsList} edit={ProductEdit} create={CreateProduct} />
      <Resource name='orders' list={OrderList} edit={OrderEdit} /> 
    </Admin>
  );
};

export default ReactAdmin;
