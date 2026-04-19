import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Gallery Store. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
            Contact
          </Link>
          <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;