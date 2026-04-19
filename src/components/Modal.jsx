import React from 'react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4 transform scale-100 transition-all duration-300 ease-out">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="text-gray-700">
          {children}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;