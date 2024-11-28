import axios from 'axios';
import { urls } from './Constant';

const PrivateApiInstance = axios.create({
  baseURL: urls.SERVER_URL,
  withCredentials: true, 
});

PrivateApiInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      const tokenValue = token.split('=')[1];
      config.headers['Authorization'] = `Bearer ${tokenValue}`;
    }
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default PrivateApiInstance;
