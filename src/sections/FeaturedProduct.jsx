import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';

const FeaturedProduct = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const featured = products.find((product) => product.isBestSeller) || products[0];
  if (!featured) return null;
  return <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-amber-50 to-orange-50"><div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"><div className="relative order-2 lg:order-1"><div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-30" /><img src={featured.image} alt={featured.name} className="relative z-10 w-full max-w-md mx-auto rounded-2xl drop-shadow-2xl" /></div><div className="order-1 lg:order-2"><p className="text-sm uppercase tracking-widest text-amber-600 mb-3">Featured Fragrance</p><h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{featured.name}</h2><p className="text-lg text-gray-600 mb-6 max-w-xl">{featured.description}</p><p className="text-sm text-gray-600 mb-8">{featured.category} · {featured.volume} · {featured.gender}</p><div className="flex items-center gap-4 mb-8"><p className="text-3xl font-bold text-gray-900">₹{featured.price.toLocaleString('en-IN')}</p><span className="text-amber-500">★★★★★ <span className="text-gray-600">({featured.rating})</span></span></div><div className="flex flex-col sm:flex-row gap-4"><button onClick={() => addToCart(featured)} className="bg-black text-white px-8 py-4 rounded-full font-semibold">Add to Cart</button><Link to={`/product/${featured.id}`} className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-900 text-center">View Details</Link></div></div></div></section>;
};
export default FeaturedProduct;