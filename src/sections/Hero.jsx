import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80"
          alt="Luxury Perfume"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-600 mb-3 md:mb-4 animate-fade-in">
              Premium Fragrance Collection
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-gray-900 mb-4 md:mb-6 leading-tight animate-fade-in-up">
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                Signature Scent
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 animate-fade-in-up animation-delay-200 max-w-2xl mx-auto lg:mx-0">
              Experience the art of perfumery with our exquisite collection of luxury fragrances. 
              Each scent tells a unique story, crafted with the finest ingredients from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up animation-delay-400 justify-center lg:justify-start">
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-full text-base font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
              >
                Explore Collection
              </Link>
              <Link
                to="/new-arrivals"
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-gray-900 text-center hover:scale-105 shadow-md"
              >
                New Arrivals
              </Link>
            </div>

            {/* Features */}
            <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 animate-fade-in-up animation-delay-600">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">100+</p>
                <p className="text-xs md:text-sm text-gray-600">Premium Fragrances</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">24/7</p>
                <p className="text-xs md:text-sm text-gray-600">Customer Support</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-xs md:text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative animate-fade-in-right mt-8 lg:mt-0 flex justify-center">
            <div className="relative z-10 w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80"
                alt="Featured Perfume"
                className="w-full aspect-[4/5] object-cover rounded-[2rem] border border-white/70 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          
            {/* Floating Elements */}
            <div className="absolute top-10 -left-10 w-24 h-24 bg-amber-200 rounded-full blur-3xl opacity-50 animate-float"></div>
            <div className="absolute bottom-10 -right-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 animate-float animation-delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;
