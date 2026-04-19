import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

function ProfilePage({ session }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth'); // Redirect to auth if no session
      return;
    }

    const getProfile = async () => {
      try {
        setLoading(true);
        const { user } = session;

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`display_name, email`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setProfile(data);
          setDisplayName(data.display_name || '');
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user.id,
        display_name: displayName,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Your Profile</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading profile...</p>
      ) : (
        <form onSubmit={updateProfile}>
          <InputField
            label="Email"
            id="email"
            type="email"
            value={profile?.email || ''}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
          <InputField
            label="Display Name"
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your display name"
          />
          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transform hover:scale-105 mt-4"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;