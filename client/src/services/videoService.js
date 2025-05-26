// client/src/services/videoService.js
import axios from 'axios';

const API = 'http://localhost:5000/api/videos';

export const uploadVideo = async (formData) =>
  await axios.post(`${API}/upload`, formData);

export const getFeed = async () => await axios.get(`${API}/feed`);

export const watchVideo = async (id) =>
  await axios.post(`${API}/${id}/watch`);

export const purchaseVideo = async (id, userId) =>
  await axios.post(`${API}/${id}/purchase`, { userId });

export const addComment = async (id, userId, content) =>
  await axios.post(`${API}/${id}/comment`, { userId, content });

export const giftCreator = async (id, userId, amount) =>
  await axios.post(`${API}/${id}/gift`, { userId, amount });
