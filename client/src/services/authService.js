import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const register = async (userData) =>
  await axios.post(`${API}/register`, userData);

export const login = async (userData) =>
  await axios.post(`${API}/login`, userData);
