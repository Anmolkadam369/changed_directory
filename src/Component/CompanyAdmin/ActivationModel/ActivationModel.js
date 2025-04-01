import React from 'react';

function ActivationModel({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(255 255 255 / 73%)] bg-opacity-60 z-50 animate-fadeIn">
      <div className="p-8 bg-white rounded-2xl shadow-2xl h-[200px] max-w-md w-11/12 text-center border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800">Confirmation</h2>
        <p className="mt-3 text-gray-600">Are you sure you want to proceed?</p>
        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={onConfirm} 
            style={{borderRadius:'10px'}}
            className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all ease-in-out duration-300 focus:ring-4 focus:ring-blue-300"
          >
            Yes, Proceed
          </button>
          <button 
            onClick={onCancel} 
            style={{borderRadius:'10px'}}
            className="px-6 py-3 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transition-all ease-in-out duration-300 focus:ring-4 focus:ring-red-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    );
}

export default ActivationModel;
