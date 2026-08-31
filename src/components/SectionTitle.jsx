import React from 'react';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-10 md:mb-12 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-2 md:mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3 md:mb-4">
        {title}
      </h2>
      <div className={`w-20 md:w-24 h-1 bg-black mt-3 md:mt-4 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;
