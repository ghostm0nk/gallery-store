import React from 'react';
import { Link } from 'react-router-dom';

function ArtistProfileCard({ artist }) {
  if (!artist) {
    return <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-600">Artist not found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{artist.display_name || 'Artist Profile'}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Email:</span> {artist.email}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Member Since:</span> {new Date(artist.created_at).toLocaleDateString()}
      </p>
      <Link to={`/artists/${artist.id}`} className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
        View Artist's Works
      </Link>
    </div>
  );
}

export default ArtistProfileCard;