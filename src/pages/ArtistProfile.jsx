import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PortraitCard from '../components/PortraitCard';
import ArtistProfileCard from '../components/ArtistProfileCard';

function ArtistProfile() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [portraits, setPortraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      setLoading(true);
      setError(null);

      // Fetch artist profile
      const { data: artistData, error: artistError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (artistError) {
        setError(artistError.message);
        setLoading(false);
        return;
      }
      setArtist(artistData);

      // Fetch artist's portraits
      const { data: portraitsData, error: portraitsError } = await supabase
        .from('portraits')
        .select(`
          *,
          profiles (display_name)
        `)
        .eq('artist_id', id)
        .order('created_at', { ascending: false });

      if (portraitsError) {
        setError(portraitsError.message);
        setLoading(false);
        return;
      }
      const portraitsWithArtistNames = portraitsData.map(p => ({
        ...p,
        artist_name: p.profiles?.display_name || 'Unknown Artist'
      }));
      setPortraits(portraitsWithArtistNames);

      setLoading(false);
    };

    fetchArtistData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-700 text-xl">Loading artist profile...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600 text-xl">Error: {error}</div>;
  }

  if (!artist) {
    return <div className="text-center py-12 text-gray-600 text-xl">Artist not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-10">
        <ArtistProfileCard artist={artist} />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
        {artist.display_name || 'Artist'}'s Portraits
      </h2>
      {portraits.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">This artist has not uploaded any portraits yet.</p>
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

export default ArtistProfile;