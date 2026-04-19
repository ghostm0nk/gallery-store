import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnailUrl || 'https://via.placeholder.com/300x200?text=Product+Image'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-1">
          {product.name}
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.artist}</p>
        <p className="text-gray-900 font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;