import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useState } from 'react';

function Navbar({ session }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-md w-full px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
          Gallery Store
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link to="/search" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Search
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            About
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">0</span> {/* Placeholder for cart item count */}
          </Link>
          {session ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Profile
              </Link>
              <button onClick={handleSignOut} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
              Sign In / Up
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/search" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
            Search
          </Link>
          <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/cart" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
            Cart
          </Link>
          {session ? (
            <>
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-md" onClick={() => setIsOpen(false)}>
              Sign In / Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;