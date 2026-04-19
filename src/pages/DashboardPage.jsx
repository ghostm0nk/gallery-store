import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PortraitCard from '../components/PortraitCard';

function DashboardPage({ session }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [userPortraits, setUserPortraits] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      const userId = session.user.id;

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
      setProfile(profileData);

      // Fetch user's orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('order_date', { ascending: false });

      if (ordersError) {
        setError(ordersError.message);
        setLoading(false);
        return;
      }
      setUserOrders(ordersData);

      // If user is an artist, fetch their portraits
      if (profileData?.role === 'artist') {
        const { data: portraitsData, error: portraitsError } = await supabase
          .from('portraits')
          .select(`
            *,
            profiles (display_name)
          `)
          .eq('artist_id', userId)
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
        setUserPortraits(portraitsWithArtistNames);
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, [session, navigate]);

  if (loading) {
    return <div className="text-center py-12 text-gray-700 text-xl">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600 text-xl">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-center py-12 text-gray-600 text-xl">Profile not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Welcome, {profile.display_name || profile.email}!
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Profile</h2>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {profile.email}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Role:</span> {profile.role}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Member Since:</span> {new Date(profile.created_at).toLocaleDateString()}</p>
        {/* Add option to update profile here */}
      </div>

      {profile.role === 'artist' && (
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">Your Portraits</h2>
            <Link to="/dashboard/portraits/new" className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
              Upload New Portrait
            </Link>
          </div>
          {userPortraits.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">You haven't uploaded any portraits yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userPortraits.map((portrait) => (
                <PortraitCard key={portrait.id} portrait={portrait} />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">Your Orders</h2>
        {userOrders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">You have no past orders.</p>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Order ID: {order.id.substring(0, 8)}...</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <p className="text-gray-800 font-bold text-xl mb-4">Total: ${order.total.toFixed(2)}</p>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {order.items.map((item, index) => (
                      <li key={index}>{item.title} x {item.quantity} (${item.price.toFixed(2)} each)</li> // Assuming `items` in order also stores title
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;