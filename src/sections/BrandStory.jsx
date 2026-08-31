import React from 'react';
import { Link } from 'react-router-dom';

const BrandStory = () => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-3 md:mb-4">
            Our Story
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            The Art of Perfumery
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            <p>
              A fragrance is more than a scent. It is a memory, a presence, and a signature 
              that defines who you are. At Aurevia, we believe in the transformative 
              power of exceptional perfumery.
            </p>
            <p>
              Each fragrance in our collection is meticulously crafted using the finest 
              ingredients sourced from around the world. From the rare agarwood of Southeast 
              Asia to the delicate Bulgarian rose, we spare no effort in our pursuit of 
              olfactory perfection.
            </p>
            <p>
              Our master perfumers blend tradition with innovation, creating scents that 
              are both timeless and contemporary. Every bottle tells a story, waiting to 
              become part of yours.
            </p>
          </div>
          <Link
            to="/about"
            className="inline-block bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-full text-base font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80"
              alt="Perfume Bottle"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1588405748879-acb5afc413e0?w=400&q=80"
              alt="Fragrance Ingredients"
              className="w-full h-60 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4 mt-8">
            <img
              src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&q=80"
              alt="Perfume Collection"
              className="w-full h-60 md:h-80 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80"
              alt="Luxury Fragrance"
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
