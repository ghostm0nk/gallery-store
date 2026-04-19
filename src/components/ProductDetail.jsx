import React from 'react';
import Button from './Button';

function ProductDetail({ product }) {
  if (!product) {
    return <div className="text-center text-gray-600">Product not found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 lg:flex lg:space-x-8">
      <div className="lg:w-1/2">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/600x400?text=Product+Image'}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-sm"
        />
      </div>
      <div className="lg:w-1/2 mt-6 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-700 text-xl mb-4">by {product.artist}</p>
        <p className="text-blue-600 font-bold text-2xl mb-6">${product.price.toFixed(2)}</p>
        <p className="text-gray-800 leading-relaxed mb-6">{product.description}</p>
        <Button className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetail;