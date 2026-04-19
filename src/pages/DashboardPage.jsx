import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth(); // user object contains profile data
  const userRole = user?.profile?.role;

  const renderCustomerDashboard = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Dashboard</h2>
      <p className="text-gray-700 mb-4">Welcome, {user?.profile?.display_name || user?.email}!</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Orders</h3>
      <ul className="space-y-3">
        {[1, 2, 3].map((orderId) => (
          <li key={orderId} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
            <span>Order #{orderId} - Total: $150.00</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Completed</span>
          </li>
        ))}
        {/* More detailed order history to be implemented */}
      </ul>
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Profile Management</h3>
      <p className="text-gray-700">Manage your account details and preferences here.</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">Edit Profile</button>
    </div>
  );

  const renderArtistDashboard = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Artist Dashboard</h2>
      <p className="text-gray-700 mb-4">Welcome back, {user?.profile?.display_name || user?.email}!</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Listings</h3>
      <ul className="space-y-3">
        {[1, 2, 3].map((portraitId) => (
          <li key={portraitId} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
            <span>Portrait Title #{portraitId} - $200.00</span>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-md hover:bg-yellow-200 transition-colors duration-200">Edit</button>
              <button className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-md hover:bg-red-200 transition-colors duration-200">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">Add New Portrait</button>

      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sales Overview</h3>
      <p className="text-gray-700">Total sales: <span className="font-bold text-green-600">$1,500.00</span></p>
      <p className="text-gray-700">Pending orders: <span className="font-bold text-yellow-600">2</span></p>
      {/* More detailed sales analytics to be implemented */}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Dashboard</h1>
      {userRole === 'artist' ? renderArtistDashboard() : renderCustomerDashboard()}
    </div>
  );
};

export default DashboardPage;