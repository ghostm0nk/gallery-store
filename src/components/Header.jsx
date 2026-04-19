import React from 'react';
import { Link } from 'react-router-dom';

function Header({ session, onLogout }) {
  return (
    <header className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
          Gallery Store
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Cart
          </Link>
          {session ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;