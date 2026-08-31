import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import forHerPerfume from '../assets/categories/for-her-perfume.jpg';

const Categories = () => {
  const categories = [
    {
      name: 'For Him',
      description: 'Bold and sophisticated fragrances for men',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&q=80',
      path: '/shop/men'
    },
    {
      name: 'For Her',
      description: 'Elegant and captivating scents for women',
      image: forHerPerfume,
      path: '/shop/women'
    },
    {
      name: 'Unisex',
      description: 'Versatile fragrances for everyone',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
      path: '/shop/unisex'
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="flex flex-col items-center">
        <SectionTitle
          subtitle="Shop By"
          title="Categories"
        />

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6">
                  {category.description}
                </p>
                <div className="inline-flex items-center text-sm md:text-base text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Shop Now
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

export default Categories;
