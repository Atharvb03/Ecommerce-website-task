import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">💎</div>
              <span className="text-2xl font-serif font-bold">Aurevia</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Crafting exquisite fragrances that tell your story. Experience luxury in every note.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">All Products</Link></li>
              <li><Link to="/shop/men" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">For Him</Link></li>
              <li><Link to="/shop/women" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">For Her</Link></li>
              <li><Link to="/shop/unisex" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Unisex</Link></li>
              <li><Link to="/best-sellers" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Best Sellers</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Collections</h3>
            <ul className="space-y-3">
              <li><Link to="/collections/oud" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Oud Collection</Link></li>
              <li><Link to="/collections/floral" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Floral Collection</Link></li>
              <li><Link to="/collections/woody" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Woody Collection</Link></li>
              <li><Link to="/collections/fresh" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Fresh Collection</Link></li>
              <li><Link to="/collections/amber" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Amber Collection</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Contact</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">Returns</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-6">Get exclusive offers and discover new fragrances</p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700 focus:border-amber-500 transition-all duration-300 min-w-0"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Aurevia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
