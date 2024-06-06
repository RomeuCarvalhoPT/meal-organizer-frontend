// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: window.ENV.API_ENDPOINT,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token and redirect to login
      localStorage.removeItem('token');
      //window.location.href = '/login'; // Or use history.push('/login') if you prefer
    }
    return Promise.reject(error);
  }
);

// Add an interceptor for /files/ to add the authentication token
instance.interceptors.request.use(
  (config) => {
    if (config.url.includes('/files')) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
