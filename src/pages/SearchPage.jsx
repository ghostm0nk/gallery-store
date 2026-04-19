import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock products for search results
  const mockProducts = [
    {
      id: 'prod1',
      name: 'Abstract Horizon',
      artist: 'Jane Doe',
      price: 49.99,
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Abstract+Horizon',
    },
    {
      id: 'prod2',
      name: 'City Lights',
      artist: 'John Smith',
      price: 75.00,
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=City+Lights',
    },
    {
      id: 'prod3',
      name: 'Forest Mystique',
      artist: 'Emily White',
      price: 60.50,
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Forest+Mystique',
    },
    {
      id: 'prod4',
      name: 'Ocean Serenity',
      artist: 'David Green',
      price: 90.00,
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Ocean+Serenity',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Search Our Gallery</h1>
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex space-x-4 mb-10 p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <InputField
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or artist..."
          className="flex-grow"
          label=""
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transform hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {loading && <p className="text-center text-gray-600">Loading search results...</p>}
      {!loading && searchResults.length === 0 && searchTerm && (
        <p className="text-center text-gray-600">No results found for "{searchTerm}".</p>
      )}
      {!loading && searchResults.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Results for "{searchTerm}"</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      {!searchTerm && !loading && (
        <p className="text-center text-xl text-gray-600">Enter a search term to find digital portraits.</p>
      )}
    </div>
  );
}

export default SearchPage;