import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Portraits</h1>
      <p className="text-gray-700">
        This is the homepage where users can browse available portraits.
        Filtering, search, and a grid of portrait cards will go here.
      </p>
      {/* Placeholder for portrait cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md p-4 animate-fade-in-up transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
              Portrait Image {item}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Portrait Title {item}</h3>
            <p className="text-gray-600 text-sm mt-1">Artist Name</p>
            <p className="text-blue-600 font-bold mt-2">$199.99</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;