import axios from 'axios';

const api = axios.create({
  baseURL: 'localhost::3000', // Substitua pelo IP do seu servidor backend
});

export default api;