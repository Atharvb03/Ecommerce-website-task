import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const CartContext = createContext();
const storageKey = (userId) => `aurevia-cart-${userId}`;
export const useCart = () => { const context = useContext(CartContext); if (!context) throw new Error('useCart must be used within a CartProvider'); return context; };

export const CartProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [cartOwnerId, setCartOwnerId] = useState(null);
  const visibleCartItems = user && cartOwnerId === user.id ? cartItems : [];
  useEffect(() => { if (loading) return; if (!user) { setCartItems([]); setCartOwnerId(null); return; } try { setCartItems(JSON.parse(localStorage.getItem(storageKey(user.id)) || '[]')); } catch { setCartItems([]); } finally { setCartOwnerId(user.id); } }, [user?.id, loading]);
  useEffect(() => { if (!loading && user && cartOwnerId === user.id) localStorage.setItem(storageKey(user.id), JSON.stringify(cartItems)); }, [cartItems, user?.id, cartOwnerId, loading]);
  const addToCart = (product, quantity = 1) => { if (!user) { navigate('/login', { state: { from: location.pathname + location.search } }); return; } setCartItems((items) => { const existing = items.find((item) => item.id === product.id); return existing ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { ...product, quantity }]; }); };
  const removeFromCart = (productId) => setCartItems((items) => items.filter((item) => item.id !== productId));
  const updateQuantity = (productId, quantity) => quantity <= 0 ? removeFromCart(productId) : setCartItems((items) => items.map((item) => item.id === productId ? { ...item, quantity } : item));
  const increaseQuantity = (productId) => setCartItems((items) => items.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  const decreaseQuantity = (productId) => setCartItems((items) => items.flatMap((item) => item.id !== productId ? [item] : item.quantity === 1 ? [] : [{ ...item, quantity: item.quantity - 1 }]));
  const value = { cartItems: visibleCartItems, addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, clearCart: () => setCartItems([]), getCartTotal: () => visibleCartItems.reduce((total, item) => total + item.price * item.quantity, 0), getCartCount: () => visibleCartItems.reduce((count, item) => count + item.quantity, 0), isInCart: (productId) => visibleCartItems.some((item) => item.id === productId) };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};