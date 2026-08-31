import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import floralPerfume from '../assets/collections/floral-perfume.jpg';
import woodyPerfume from '../assets/collections/woody-perfume.jpg';

const Collections = () => {
  const collections = [
    {
      name: 'Oud Collection',
      description: 'Experience the richness of rare agarwood',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80',
      path: '/collections/oud',
      color: 'from-amber-900/80 to-amber-700/80'
    },
    {
      name: 'Floral Collection',
      description: 'Delicate blooms captured in a bottle',
      image: floralPerfume,
      path: '/collections/floral',
      color: 'from-pink-900/80 to-pink-700/80'
    },
    {
      name: 'Woody Collection',
      description: 'Earthy and sophisticated forest notes',
      image: woodyPerfume,
      path: '/collections/woody',
      color: 'from-green-900/80 to-green-700/80'
    },
    {
      name: 'Fresh Collection',
      description: 'Crisp, clean, and invigorating scents',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80',
      path: '/collections/fresh',
      color: 'from-blue-900/80 to-blue-700/80'
    },
    {
      name: 'Amber Collection',
      description: 'Warm and sensual oriental fragrances',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
      path: '/collections/amber',
      color: 'from-orange-900/80 to-orange-700/80'
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="flex flex-col items-center">
        <SectionTitle
          subtitle="Explore Our"
          title="Signature Collections"
        />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <Link
              key={index}
              to={collection.path}
              className="group relative overflow-hidden rounded-2xl h-80 md:h-96 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image */}
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} group-hover:opacity-90 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                  {collection.name}
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300">
                  {collection.description}
                </p>
                <div className="flex items-center text-sm md:text-base text-white font-semibold opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 -translate-x-4 transition-all duration-300">
                  Explore Collection
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
