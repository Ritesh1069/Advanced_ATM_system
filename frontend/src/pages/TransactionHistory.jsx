import React from 'react';
import Acc from '../components/Acc';
import { useNavigate } from 'react-router-dom';

const transactions = [
  { date: '2023-07-01', time: '10:00 AM', amount: 1000 },
  { date: '2023-07-02', time: '11:30 AM', amount: 2000 },
  { date: '2023-07-03', time: '01:00 PM', amount: 1500 },
];

const TransactionHistory = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <Acc />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Transaction History</h1>
        <div className="overflow-x-auto  ">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Date</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Time</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.date}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.time}</td>
                  <td className="py-2 px-4 border-b border-gray-200 ">{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-center items-center'>
          <button
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 px-6"
          onClick={() => navigate('/')}
        >
          Back
        </button>
        </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;

