import React from 'react'
import { useNavigate } from 'react-router-dom';
const Unreach = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100' id='bo'>
      {/* <div className='bg-indigo-500 w-56 h-56 rounded flex items-center justify-center'>
      </div> */}
      <div class="bg-gray-100 px-2 text-center">
        <div class="h-screen flex flex-col justify-center items-center">
          <h1 class="text-8xl font-extrabold text-red-500">500</h1>
          <p class="text-4xl font-medium text-gray-800">Internal Server Error</p>
          <p class="text-xl text-gray-800 mt-4">Error connecting to the Server. Please try again later.</p>
          <button type="submit" 
          className="py-2 px-10 mt-5 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={ () => navigate('/Auth')}
          >
            Go back to Login Page
            </button>
            </div>
            </div>
            </div>
            );
          }

export default Unreach
