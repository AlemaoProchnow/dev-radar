import axios from 'axios';

const api = axios.create({
  baseURL: 'exp://10.0.0.2:3333',
});

export default api;