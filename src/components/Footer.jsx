import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Gallery Store. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</Link>
          <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-200">Cart</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</Link>
          <Link to="/auth/login" className="text-gray-300 hover:text-white transition-colors duration-200">Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;