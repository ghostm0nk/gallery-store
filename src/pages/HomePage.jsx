import React, { useEffect, useState } from 'react';
import PortraitCard from '../components/PortraitCard';
import { supabase } from '../lib/supabase';

function HomePage() {
  const [portraits, setPortraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortraits = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('portraits')
        .select(`
          *,
          profiles (display_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        console.error('Error fetching portraits:', error);
      } else {
        const portraitsWithArtistNames = data.map(p => ({
          ...p,
          artist_name: p.profiles?.display_name || 'Unknown Artist'
        }));
        setPortraits(portraitsWithArtistNames);
      }
      setLoading(false);
    };

    fetchPortraits();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-700">Loading portraits...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">All Portraits</h1>
      {portraits.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No portraits available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {portraits.map((portrait) => (
            <PortraitCard key={portrait.id} portrait={portrait} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;