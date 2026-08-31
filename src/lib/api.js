const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const request = async (path, options = {}) => {
  const token = localStorage.getItem('aurevia-token');
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(!isFormData && options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (response.status === 204) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || Object.values(payload.errors || {}).flat()[0] || 'Something went wrong.');
  return payload;
};

export const api = {
  getProducts: () => request('/products'),
  getProduct: (id) => request(`/products/${id}`),
  getMyProducts: () => request('/my-products'),
  createProduct: (data) => request('/products', { method: 'POST', body: data instanceof FormData ? data : JSON.stringify(data) }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: data instanceof FormData ? 'POST' : 'PATCH', body: data instanceof FormData ? data : JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  login: (data) => request('/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => request('/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => request('/logout', { method: 'POST' }),
  user: () => request('/user'),
};

export const normalizeProduct = (product) => ({
  ...product,
  name: product.title || product.name,
  image: product.image_url || product.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
  images: product.images?.length ? product.images : [product.image_url || product.image || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80'],
  rating: Number(product.rating || 5),
  price: Number(product.price),
  volume: product.volume || '—',
  gender: product.gender || 'Unisex',
  isNewArrival: Boolean(product.is_new_arrival ?? product.isNewArrival),
  isBestSeller: Boolean(product.is_best_seller ?? product.isBestSeller),
});