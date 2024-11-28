import axios from 'axios';
import { conf, urls } from './Constant';

const PublicApiInstance = axios.create({
  baseURL: urls.SERVER_URL,
  withCredentials: true, 
});

PublicApiInstance.interceptors.request.use(
  (config) => {
    const apiKey = conf.REACT_APP_API_KEY;
    if (apiKey) {
      config.headers['blogweb-api-key'] = apiKey;
    }
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default PublicApiInstance;
