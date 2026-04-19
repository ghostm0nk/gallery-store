import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function PortraitDetail() {
  const { id } = useParams();
  const [portrait, setPortrait] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortrait = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('portraits')
        .select(`
          *,
          profiles (id, display_name)
        `)
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
        console.error('Error fetching portrait:', error);
      } else {
        setPortrait({
          ...data,
          artist_name: data.profiles?.display_name || 'Unknown',
          artist_id: data.profiles?.id || null
        });
      }
      setLoading(false);
    };

    fetchPortrait();
  }, [id]);

  const handleAddToCart = () => {
    // Implement add to cart logic here
    // This would typically involve context, Redux, or a global state management solution
    alert(`Added "${portrait.title}" to cart! (Placeholder)`);
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-700 text-xl">Loading portrait details...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600 text-xl">Error: {error}</div>;
  }

  if (!portrait) {
    return <div className="text-center py-12 text-gray-600 text-xl">Portrait not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={portrait.image_url} alt={portrait.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{portrait.title}</h1>
            <p className="text-xl text-gray-700 mb-4">
              Artist: {' '}
              {portrait.artist_id ? (
                <Link to={`/artists/${portrait.artist_id}`} className="font-semibold text-blue-600 hover:underline transition-colors duration-200">
                  {portrait.artist_name}
                </Link>
              ) : (
                <span className="font-semibold">{portrait.artist_name}</span>
              )}
            </p>
            <p className="text-gray-800 leading-relaxed mb-6">{portrait.description}</p>
            <p className="text-5xl font-bold text-blue-700 mb-6">${portrait.price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PortraitDetail;