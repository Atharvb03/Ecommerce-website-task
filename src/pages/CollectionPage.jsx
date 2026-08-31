import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';
import { useProducts } from '../context/ProductsContext';
import LoadingState from '../components/LoadingState';

const CollectionPage = () => {
  const { collection } = useParams();
  const { products: allProducts, loading } = useProducts();
  
  // Map URL params to category names
  const categoryMap = {
    'oud': 'Oud',
    'floral': 'Floral',
    'woody': 'Woody',
    'fresh': 'Fresh',
    'amber': 'Amber',
    'oriental': 'Oriental',
    'citrus': 'Citrus'
  };

  const categoryName = categoryMap[collection] || collection;
  const products = allProducts.filter((p) => p.category === categoryName);

  const collectionDescriptions = {
    'Oud': 'Experience the richness and depth of rare agarwood in our exclusive Oud collection.',
    'Floral': 'Delicate blooms and captivating petals captured in exquisite fragrance compositions.',
    'Woody': 'Earthy and sophisticated scents featuring precious woods and forest notes.',
    'Fresh': 'Crisp, clean, and invigorating fragrances perfect for everyday wear.',
    'Amber': 'Warm, sensual, and enveloping scents with rich amber accords.',
    'Oriental': 'Exotic and spicy fragrances inspired by Eastern perfumery traditions.',
    'Citrus': 'Vibrant and uplifting scents featuring zesty citrus notes.'
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <SectionTitle
          subtitle="Collection"
          title={`${categoryName} Fragrances`}
        />

        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {collectionDescriptions[categoryName] || 'Discover our curated selection of premium fragrances.'}
        </p>

        {loading ? <LoadingState /> : products.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {products.map(product => (
              <div key={product.id} className="w-full max-w-sm">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
