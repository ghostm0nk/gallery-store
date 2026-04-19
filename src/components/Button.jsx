import React from 'react';

function Button({ children, onClick, type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg shadow-md transition-all duration-200 
                 ${className.includes('bg-') ? '' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                 ${className.includes('text-') ? '' : 'text-white'}
                 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;