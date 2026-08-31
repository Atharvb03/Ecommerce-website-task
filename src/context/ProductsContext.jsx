import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, normalizeProduct } from '../lib/api';

const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const refreshProducts = async () => { setLoading(true); try { const result = await api.getProducts(); setProducts((result.data || result).map(normalizeProduct)); setError(''); } catch (e) { setError(e.message || 'Unable to load products.'); } finally { setLoading(false); } };
  useEffect(() => { refreshProducts(); }, []);
  return <ProductsContext.Provider value={{ products, loading, error, refreshProducts }}>{children}</ProductsContext.Provider>;
}
