import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Obtener token del localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
};

// Cliente axios configurado
export const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones de la API

// Admin - Login
export async function adminLogin(adminKey: string) {
  const response = await api.post('/admin/login', { adminKey });
  return response.data;
}

// Tenants
export async function getTenants() {
  const response = await api.get('/admin/tenants', {
    headers: { 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY }
  });
  return response.data;
}

export async function createTenant(data: { name: string; plan: string }) {
  const response = await api.post('/admin/tenants', data, {
    headers: { 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY }
  });
  return response.data;
}

// Métricas (crearemos estos endpoints en el backend)
export async function getMetrics() {
  const response = await api.get('/admin/tenants/metrics', {
    headers: { 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY }
  });
  return response.data;
}

export async function getUsers() {
  const response = await api.get('/admin/tenants/users', {
    headers: { 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY }
  });
  return response.data;
}

export async function getSubscriptions() {
  const response = await api.get('/admin/tenants/subscriptions', {
    headers: { 'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_KEY }
  });
  return response.data;
}