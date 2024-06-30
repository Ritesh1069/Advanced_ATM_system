import React from 'react';
import Acc from '../components/Acc';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-6">
      <div className="text-2xl font-bold mt-5">WELCOME SHUBHAM MOTE !!!</div>
      <Acc />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="bg-blue-500 text-white py-6 px-4 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
          onClick={() => navigate('/Withdraw')} >
          <div className="flex items-center space-x-2">
            <span>Withdraw Money</span>
          </div>
        </button>
        <button className="bg-green-500 text-white py-10 px-9 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
         " onClick={() => navigate('/Deposit')}>
          <div className="flex items-center space-x-2">
            <span>Deposit Money</span>
          </div>
        </button>
        <button className="bg-yellow-500 text-white py-10 px-4 rounded shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        onClick={() => navigate('/Balance')}>
          <div className="flex items-center space-x-2">
            <span>Check Balance</span>
          </div>
        </button>
        <button className="bg-red-500 text-white py-10 px-12 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={() => navigate('/History')}>
          <div className="flex items-center space-x-2">
            <span>Transactions Statement</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Deposit;
