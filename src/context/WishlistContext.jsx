import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const WishlistContext = createContext();
const storageKey = (userId) => `aurevia-wishlist-${userId}`;
export const useWishlist = () => { const context = useContext(WishlistContext); if (!context) throw new Error('useWishlist must be used within a WishlistProvider'); return context; };

export const WishlistProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistOwnerId, setWishlistOwnerId] = useState(null);
  const visibleWishlistItems = user && wishlistOwnerId === user.id ? wishlistItems : [];
  useEffect(() => { if (loading) return; if (!user) { setWishlistItems([]); setWishlistOwnerId(null); return; } try { setWishlistItems(JSON.parse(localStorage.getItem(storageKey(user.id)) || '[]')); } catch { setWishlistItems([]); } finally { setWishlistOwnerId(user.id); } }, [user?.id, loading]);
  useEffect(() => { if (!loading && user && wishlistOwnerId === user.id) localStorage.setItem(storageKey(user.id), JSON.stringify(wishlistItems)); }, [wishlistItems, user?.id, wishlistOwnerId, loading]);
  const addToWishlist = (product) => { if (!user) return; setWishlistItems((items) => items.some((item) => item.id === product.id) ? items : [...items, product]); };
  const removeFromWishlist = (productId) => setWishlistItems((items) => items.filter((item) => item.id !== productId));
  const isInWishlist = (productId) => visibleWishlistItems.some((item) => item.id === productId);
  const toggleWishlist = (product) => { if (!user) { navigate('/login', { state: { from: location.pathname + location.search } }); return; } isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product); };
  const value = { wishlistItems: visibleWishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist: () => setWishlistItems([]), isInWishlist, getWishlistCount: () => visibleWishlistItems.length };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};