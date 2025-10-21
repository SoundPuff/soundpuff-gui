import axios from 'axios';

const API_URL = '/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const auth = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

export const users = {
  getMe: () => api.get('/users/me'),
  updateMe: (data) => api.put('/users/me', data),
  getUser: (username) => api.get(`/users/${username}`),
  follow: (username) => api.post(`/users/${username}/follow`),
  unfollow: (username) => api.delete(`/users/${username}/follow`),
  getFollowers: (username) => api.get(`/users/${username}/followers`),
  getFollowing: (username) => api.get(`/users/${username}/following`),
};

export const playlists = {
  getAll: () => api.get('/playlists/'),
  getFeed: () => api.get('/playlists/feed'),
  create: (data) => api.post('/playlists/', data),
  getById: (id) => api.get(`/playlists/${id}`),
  update: (id, data) => api.put(`/playlists/${id}`, data),
  delete: (id) => api.delete(`/playlists/${id}`),
  like: (id) => api.post(`/playlists/${id}/like`),
  unlike: (id) => api.delete(`/playlists/${id}/like`),
  getComments: (id) => api.get(`/playlists/${id}/comments`),
  addComment: (id, data) => api.post(`/playlists/${id}/comments`, data),
  updateComment: (commentId, data) => api.put(`/playlists/comments/${commentId}`, data),
  deleteComment: (commentId) => api.delete(`/playlists/comments/${commentId}`),
};

export default api;
