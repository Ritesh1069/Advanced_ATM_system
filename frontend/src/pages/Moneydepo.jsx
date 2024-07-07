import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Acc from '../components/Acc';
import Modal from '../components/Modal'; 
import axios from 'axios';
// deposit page
const Moneydeposit = () => {
  const [info, setInfo] = useState([]);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <Acc account_no = {info._id}/>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col">
        <h1 className="text-xl font-bold text-center mb-4">Deposit money</h1>
        <div className="mb-4 flex justify-center items-center">
         <img src='/deposit 2.png'/>
        </div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter the Deposit Amount"
          className="w-full p-2 border border-gray-300 rounded bg-slate-300"
        />
        {action && <div className="text-center mt-2 text-red-500">{action}</div>}
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
    </div>
  );
};

export default Moneydeposit;


