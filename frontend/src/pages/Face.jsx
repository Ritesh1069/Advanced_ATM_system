import React from 'react';
import Acc from '../components/Acc';

const Face = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <Acc />
      <div className='bg-indigo-500 w-56 h-56 rounded flex items-center justify-center'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <div className='flex justify-center'>
        <button
          type="submit"
          className="py-2 px-10 mt-5 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Open camera
        </button>
      </div>
    </div>
  );
}

export default Face;

