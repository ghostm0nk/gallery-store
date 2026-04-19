import React from 'react';
import { Link } from 'react-router-dom';

function PortraitCard({ portrait }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
      <Link to={`/portraits/${portrait.id}`}>
        <img src={portrait.image_url} alt={portrait.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{portrait.title}</h3>
          <p className="text-sm text-gray-600">
            Artist: <span className="font-medium">{portrait.artist_name || 'Unknown'}</span>
          </p>
          <p className="text-xl font-bold text-blue-600 mt-2">${portrait.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}

export default PortraitCard;