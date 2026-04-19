import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ImageUpload from '../components/ImageUpload';

function NewPortrait({ session }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || data?.role !== 'artist') {
        setError('You must be an artist to upload portraits.');
        navigate('/dashboard'); // Redirect if not an artist
        return;
      }
      setProfile(data);
    };

    fetchProfile();
  }, [session, navigate]);

  const handleImageUploadSuccess = (url) => {
    setImageUrl(url);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!imageUrl) {
      setError('Please upload an image for the portrait.');
      setLoading(false);
      return;
    }

    if (profile?.role !== 'artist') {
      setError('You are not authorized to upload portraits.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.from('portraits').insert({
        title,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
        artist_id: session.user.id,
      }).select();

      if (error) {
        throw error;
      }

      alert('Portrait uploaded successfully!');
      navigate('/dashboard'); // Redirect to dashboard after upload
    } catch (err) {
      setError(`Error uploading portrait: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!session || !profile || profile.role !== 'artist') {
    return (
      <div className="text-center py-12 text-gray-700 text-xl">
        Redirecting... You must be an artist to upload portraits.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Upload New Portrait</h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Portrait Title</label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
          {imageUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Image Preview:</p>
              <img src={imageUrl} alt="Uploaded" className="max-w-full h-48 object-contain rounded-md border border-gray-200" />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !imageUrl}
              className={`w-full px-6 py-3 rounded-lg shadow-md text-white font-semibold text-lg transition-all duration-200
                          ${loading || !imageUrl ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Submitting...' : 'Create Portrait'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPortrait;