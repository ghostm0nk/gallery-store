import React from 'react';
import { Link } from 'react-router-dom';

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
      <img src={item.portrait.image_url} alt={item.portrait.title} className="w-20 h-20 object-cover rounded-md mr-4" />
      <div className="flex-grow">
        <Link to={`/portraits/${item.portrait.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
          {item.portrait.title}
        </Link>
        <p className="text-gray-600 text-sm">Artist: {item.portrait.artist_name || 'Unknown'}</p>
        <p className="text-blue-600 font-bold mt-1">${item.portrait.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.portrait.id, parseInt(e.target.value))}
          className="w-16 p-2 border border-gray-300 rounded-md text-center"
        />
        <button
          onClick={() => onRemove(item.portrait.id)}
          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;