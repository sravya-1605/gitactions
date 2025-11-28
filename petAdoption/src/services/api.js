import axios from 'axios';

const API_BASE_URL = 'http://localhost:2025/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  checkUsername: (username) => api.get(`/auth/check-username?username=${username}`),
  checkEmail: (email) => api.get(`/auth/check-email?email=${email}`),
};

// Pets API
export const petsAPI = {
  getAllPets: () => api.get('/pets'),
  getAvailablePets: () => api.get('/pets/available'),
  searchPets: (params) => api.get('/pets/search', { params }),
  getPetTypes: () => api.get('/pets/types'),
  getBreedsByType: (type) => api.get(`/pets/breeds?type=${type}`),
  getPetById: (id) => api.get(`/pets/${id}`),
  createPet: (petData) => api.post('/pets', petData),
  updatePet: (id, petData) => api.put(`/pets/${id}`, petData),
  deletePet: (id) => api.delete(`/pets/${id}`),
  // Owner-specific helpers
  getOwnerPets: (ownerId) => api.get(`/pets?ownerId=${ownerId}`),
  addPet: (petData) => api.post('/pets', petData),
};

// Adoption Requests API
export const adoptionRequestsAPI = {
  getAllRequests: () => api.get('/adoption-requests'),
  getMyRequests: () => api.get('/adoption-requests/my-requests'),
  getShelterRequests: () => api.get('/adoption-requests/shelter-requests'),
  getRequestsByPet: (petId) => api.get(`/adoption-requests/pet/${petId}`),
  getRequestById: (id) => api.get(`/adoption-requests/${id}`),
  createRequest: (requestData) => api.post('/adoption-requests', requestData),
  approveRequest: (id, reviewData) => api.put(`/adoption-requests/${id}/approve`, reviewData),
  rejectRequest: (id, reviewData) => api.put(`/adoption-requests/${id}/reject`, reviewData),
  deleteRequest: (id) => api.delete(`/adoption-requests/${id}`),
};

export default api;
