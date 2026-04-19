import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tighter">
          Discover Exceptional Portraits
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Curated collection of handcrafted portraits from talented artists worldwide. Each piece tells a unique story.
        </p>
      </div>
      
      {/* Placeholder for portrait cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-50">
            <div className="h-48 w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-gray-400 text-lg font-medium">
                Portrait Preview
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                Portrait Title {item}
              </h3>
              <p className="text-gray-500 mb-4 leading-relaxed">
                By Artist Name
              </p>
              <p className="text-2xl font-bold text-blue-600 mb-6">
                $199.99
              </p>
              <button 
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to action section */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Ready to Find Your Perfect Portrait?
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
          Browse our collection and discover artwork that speaks to you. New portraits added weekly.
        </p>
        <div className="flex justify-center">
          <button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;