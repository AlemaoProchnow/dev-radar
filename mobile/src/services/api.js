import axios from 'axios';

const api = axios.create({
  baseURL: 'exp://192.168.2.3:3333',
});

export default api;