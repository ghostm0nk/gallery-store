import React from 'react';
import Button from './Button';

function CartItem({ item }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 bg-white rounded-lg shadow-sm mb-2">
      <div className="flex items-center space-x-4">
        <img
          src={item.thumbnailUrl || 'https://via.placeholder.com/80x60?text=Item'}
          alt={item.name}
          className="w-20 h-16 object-cover rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Button className="px-3 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300">-</Button>
          <span className="mx-3 text-lg font-medium">{item.quantity}</span>
          <Button className="px-3 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300">+</Button>
        </div>
        <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1">Remove</Button>
      </div>
    </div>
  );
}

export default CartItem;