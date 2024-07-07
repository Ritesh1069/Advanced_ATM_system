import React from 'react';
import Acc from '../components/Acc';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Modal from '../components/Modal';
import axios from 'axios';

const Deposit = () => {
  const [info, setInfo] = useState([]);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
   const handleSubmit = () => {
    const depositAmount = parseFloat(amount);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      setAction('Invalid amount. Please enter a valid amount.');
    } else {
      setAction('');
      navigate('/transaction', { state: { depositAmount } });
    }
  };

  const handleMicClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDeposit = () => {
    setIsModalOpen(false);
    handleSubmit();
  };

  // useEffect(() => {
  //   axios.post('http://localhost:8080/get_info')
  //   .then(response => {
  //     if (response.data.message == 'Success' && response.data.face_status){
  //       setInfo(response.data.user_db)
  //     }
  //     else{
  //       axios.post('http://localhost:8080/logout')
  //       navigate('/')
  //     }
  //   })
  //   .catch(error => {
  //     setInfo("Error")
  //     navigate('/Unreach')
  //   })
  // },[])


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-6">
      <div className="text-4xl font-bold mt-5">WELCOME {info?.name?.toUpperCase() || 'Loading...'}!</div>
      <Acc account_no = {info._id}/>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="bg-blue-500 text-white py-6 px-4 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
          onClick={() => navigate('/Withdraw')} >
          <div className="flex items-center space-x-2">
          <img src='/cash-withdrawal 2.png' height={56} width={56}/>
            <span className='font-bold'>Withdraw Money</span>
          </div>
        </button>
        <button className="bg-green-500 text-white py-10 px-9 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
         " onClick={() => navigate('/Deposit')}>
          <div className="flex items-center space-x-2">
          <img src='/deposit 2.png' height={56} width={56}/>
            <span className="font-bold">Deposit Money</span>
          </div>
        </button>
        <button className="bg-yellow-500 text-white py-10 px-4 rounded shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        onClick={() => navigate('/Balance')}>
          <div className="flex items-center space-x-2">
          <img src='/cash 1.png' height={56} width={56}/>
            <span className='font-bold'>Check Balance</span>
          </div>
        </button>
        <button className="bg-red-500 text-white py-10 px-12 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={() => navigate('/History')}>
          <div className="flex items-center space-x-2">
          <img src='/evaluation (1) 1.png' height={56} width={56}/>
            <span className='font-bold'>Transactions Statement</span>
          </div>
        </button>
      </div>

      <div className='flex justify-center'>
        <button
          type="submit"
          className="py-2 px-10 mt-5 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {axios.post('http://localhost:8080/logout'); navigate('/');}}
        >
          Logout
        </button>
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
        onConfirm={handleConfirmDeposit}
        amount={amount}
      />
      </div>
    </div>
  );
}

export default Deposit;
