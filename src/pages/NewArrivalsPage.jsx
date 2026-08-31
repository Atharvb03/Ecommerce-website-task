import React from 'react';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductsContext';

const NewArrivalsPage = () => {
  const { products } = useProducts();
  const newArrivals = products.filter((product) => product.isNewArrival);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <SectionTitle
          subtitle="Just Arrived"
          title="New Fragrances"
        />

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Be the first to experience our latest creations. Fresh arrivals featuring 
          innovative compositions and captivating scent profiles.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {newArrivals.map(product => (
            <div key={product.id} className="w-full max-w-sm">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;
