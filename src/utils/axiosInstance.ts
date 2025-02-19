// axiosInstance.ts
import axios from 'axios';
import { multiauthServerUrl, serverApiKey } from '../api';

const axiosInstance = axios.create({
  baseURL: multiauthServerUrl,
  withCredentials: true, // Ensure cookies are sent on every request
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': serverApiKey,
  },
});

export default axiosInstance;
