import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Acc from '../components/Acc';
import Modal from '../components/Modal'; // Import the Modal component

const Withdraw = () => {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (withdrawalAmount > balance) {
      setError('Insufficient funds');
    } else {
      setBalance(balance - withdrawalAmount); // Update balance
      navigate('/moneywithdraw', { state: { amount: withdrawalAmount } });
    }
  };

  const handleMicClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmWithdrawal = () => {
    setIsModalOpen(false);
    handleSubmit();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <Acc />
      <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col">
        <h1 className="text-xl font-bold text-center mb-4">Withdraw money</h1>
        <div className="mb-4 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7V8a1 1 0 112 0v3h1a1 1 0 110 2h-4a1 1 0 110-2h1zm1 4a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Enter the Withdrawal Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-slate-300"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 px-10 mt-5 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
      <button
        onClick={handleMicClick}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 18a3.5 3.5 0 003.5-3.5h-1A2.5 2.5 0 0110 17a2.5 2.5 0 01-2.5-2.5h-1A3.5 3.5 0 0010 18z" />
          <path d="M10 4a2 2 0 00-2 2v4a2 2 0 004 0V6a2 2 0 00-2-2z" />
          <path d="M5 8v2a5 5 0 0010 0V8h-1v2a4 4 0 01-8 0V8H5z" />
        </svg>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmWithdrawal}
        amount={amount}
      />
    </div>
  );
};

export default Withdraw;


