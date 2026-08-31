import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductsContext';
import LoadingState from '../components/LoadingState';

const Shop = () => {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q')?.trim().toLowerCase() || '';
  const [sortBy, setSortBy] = useState('featured');
  const [filteredCategory, setFilteredCategory] = useState('all');
  const { products, loading, error } = useProducts();

  // Get products based on gender parameter
  let displayProducts = gender ? products.filter((p) => p.gender === gender.charAt(0).toUpperCase() + gender.slice(1)) : products;

  if (searchTerm) {
    displayProducts = displayProducts.filter((product) => [product.name, product.category, product.description, product.user?.name].filter(Boolean).some((value) => value.toLowerCase().includes(searchTerm)));
  }

  // Filter by category
  if (filteredCategory !== 'all') {
    displayProducts = displayProducts.filter(p => p.category === filteredCategory);
  }

  // Sort products
  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const getTitle = () => {
    if (gender) {
      return `Fragrances for ${gender.charAt(0).toUpperCase() + gender.slice(1)}`;
    }
    return searchTerm ? 'Search Results' : 'All Fragrances';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <SectionTitle title={getTitle()} subtitle="Shop Our Collection" />

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilteredCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  filteredCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {loading && <LoadingState />}
        {error && <p className="text-red-600 mb-6">{error}</p>}
        {/* Product Grid */}
        {!loading && sortedProducts.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {sortedProducts.map(product => (
              <div key={product.id} className="w-full max-w-sm">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
