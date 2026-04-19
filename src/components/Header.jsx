import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <header className="bg-white shadow-md p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
          Gallery Store
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Browse
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Cart
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Dashboard
              </Link>
              {user.profile?.role === 'artist' && (
                <Link to="/artist/create" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Upload Portrait
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Login
              </Link>
              <Link to="/auth/register" className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;