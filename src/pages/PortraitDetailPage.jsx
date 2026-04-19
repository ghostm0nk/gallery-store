import React from 'react';
import { useParams } from 'react-router-dom';

const PortraitDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Portrait Detail View</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-80 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xl">
            Portrait Image {id}
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Amazing Portrait Title {id}</h2>
            <p className="text-gray-600 text-lg mb-4">By Artist Name</p>
            <p className="text-gray-700 mb-6">
              This is a detailed description of the portrait. It captures the essence of the subject with vibrant colors and intricate brushwork.
              Perfect for art enthusiasts and collectors.
            </p>
            <p className="text-blue-600 text-3xl font-bold mb-6">$299.99</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortraitDetailPage;