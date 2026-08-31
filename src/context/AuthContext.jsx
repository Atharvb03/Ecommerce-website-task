import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { if (!localStorage.getItem('aurevia-token')) return setLoading(false); try { setUser((await api.user()).user); } catch { localStorage.removeItem('aurevia-token'); } finally { setLoading(false); } })(); }, []);
  const authenticate = async (method, values) => { const result = await api[method](values); localStorage.setItem('aurevia-token', result.token); setUser(result.user); return result.user; };
  const logout = async () => { try { await api.logout(); } finally { localStorage.removeItem('aurevia-token'); setUser(null); } };
  return <AuthContext.Provider value={{ user, loading, login: (v) => authenticate('login', v), register: (v) => authenticate('register', v), logout }}>{children}</AuthContext.Provider>;
}
