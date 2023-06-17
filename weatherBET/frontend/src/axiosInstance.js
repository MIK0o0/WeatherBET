import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  // Dodatkowe opcje konfiguracyjne, jeśli są wymagane
});

export default instance;
