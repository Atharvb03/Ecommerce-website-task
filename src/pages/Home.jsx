import React from 'react';
import Hero from '../sections/Hero';
import NewArrivals from '../sections/NewArrivals';
import Collections from '../sections/Collections';
import BestSellers from '../sections/BestSellers';
import Categories from '../sections/Categories';
import FeaturedProduct from '../sections/FeaturedProduct';
import BrandStory from '../sections/BrandStory';
import WhyChooseUs from '../sections/WhyChooseUs';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewArrivals />
        <Collections />
        <BestSellers />
        <Categories />
        <FeaturedProduct />
        <BrandStory />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Home;
