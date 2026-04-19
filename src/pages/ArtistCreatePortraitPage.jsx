import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const ArtistCreatePortraitPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user?.id) {
      setError('You must be logged in to create a portrait.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('portraits')
        .insert({
          artist_id: user.id,
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          image_url: formData.imageUrl,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        })
        .select();

      if (error) throw error;

      alert('Portrait submitted successfully!');
      navigate('/dashboard'); // Redirect to artist dashboard after submission
    } catch (err) {
      setError(err.message);
      console.error('Error submitting portrait:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Submit New Portrait</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-semibold mb-2">Price ($)</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required step="0.01" min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-semibold mb-2">Image URL</label>
          <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-6">
          <label htmlFor="tags" className="block text-gray-700 text-sm font-semibold mb-2">Tags (comma-separated)</label>
          <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Portrait'}
        </button>
      </form>
    </div>
  );
};

export default ArtistCreatePortraitPage;