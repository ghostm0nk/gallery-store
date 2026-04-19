import React from 'react';

function InputField({ label, id, type = 'text', value, onChange, placeholder, className = '', ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                   sm:text-sm transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
}

export default InputField;