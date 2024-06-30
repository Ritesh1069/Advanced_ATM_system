import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-lg font-bold mb-4">Listening...</h2>
        <p className="mb-4">Please confirm the amount</p>
        <p className="text-2xl font-bold mb-4">1000 Rs</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
