import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductsContext';

const BestSellers = () => {
  const { products } = useProducts();
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-white">
      <div className="flex flex-col items-center">
        <SectionTitle
          subtitle="Customer Favorites"
          title="Best Sellers"
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
          {bestSellers.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center w-full">
          <Link
            to="/best-sellers"
            className="inline-block bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-full text-base font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            View All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
