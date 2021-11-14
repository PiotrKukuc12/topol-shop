import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    try {
      const { data } = await axios.post('/api/admin/login', {
        name: username,
        password: password,
      });
      Cookies.set('token', data.token);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  },
  // called when the user clicks on the logout button
  logout: () => {
    Cookies.remove('token');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      Cookies.remove('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return Cookies.get('token') ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
