import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Gallery Store</h3>
          <p className="text-gray-400 text-sm mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </Link>
          <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-200">
            Cart
          </Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;