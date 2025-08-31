


// src/api.js

import axios from 'axios';
import { auth } from '../firebase/firebase';
 // Import firebase auth

const Api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// This is an Axios interceptor. It runs BEFORE every single request is sent.
Api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      // If a user is logged in, get their ID token.
      const token = await user.getIdToken();
      // Add the token to the Authorization header.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;