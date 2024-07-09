import React from 'react';
import Acc from '../components/Acc';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Modal from '../components/Modal';
import axios from 'axios';
//Home page
const Deposit = () => {
  const [info, setInfo] = useState([]);
  const [amount, setAmount] = useState(null);
  const [action, setAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();   
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Display a message to the user
      event.preventDefault();
      event.returnValue = 'You will be logged out if you exit. Are you sure you want to leave?';
    };

    const handleUnload = () => {
      axios.post('http://localhost:8080/logout');
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  
  const handleMicClick = () => {
    // alert("Modal Clicked")
    setAction(null);
    setAmount(null);
    setIsModalOpen(true);
    axios.post('http://localhost:8080/voice')
    .then(response => {
      if (response.data.status == "Success"){
        if(response.data.action == "Debit"){
          // alert("Debit?"+response.data.amount)
          setAction('Debit')
          setAmount(response.data.amount)
        }
        else if(response.data.action == "Credit"){
          // alert("Credit?"+response.data.amount)
          setAction('Credit')
          setAmount(response.data.amount)
        }
        else if(response.data.action == "Check Balance"){
          // alert("Check balance?")
          setAction('Check Balance')
          setAmount(null)
        }
        else if(response.data.action == "Transaction History"){
          // alert("Transaction History?")
          setAction('Transaction History')
          setAmount(null)
        }
      }
      else{
        alert(response.data.action)
        handleCloseModal();
      }
    })
    .catch(error =>{
      alert("error: "+error.message)
      handleCloseModal();
    })
  };

  const handleCloseModal = () => {
    // alert("Modal Closed")
    setAction(null);
    setAmount(null);
    setIsModalOpen(false);
  };

  const handleConfirmDeposit = () => {
    if(action == "Debit"){
      // alert("Debiting amount")
      if(amount) {
        if (isNaN(amount) || amount <= 0){
        alert('Please enter a valid amount');
        handleCloseModal();
      }
      else{
        const formData = new FormData();
        formData.append('amount', amount);
        axios.post('http://localhost:8080/debit_money', formData)
        .then(response => {
          if(response.data.message == true){
            // setError('Successful.');
            handleCloseModal();
            navigate('/moneywithdraw', { state: { amount: amount } });
          }
          else if(response.data.message == false){
            alert('Insufficient funds');
            handleCloseModal();
          }
          else{
            alert('Some Unexpected Error occurred! Please Login Again.');
            handleCloseModal();
          }
        })
        .catch(error => {
          alert("Error: "+error.message);
          handleCloseModal();
        })
      }
    }
    else{
      alert("Please mention some amount.");
      handleCloseModal();
    } }
    else if(action == "Credit"){
      // alert("Crediting Amount")
      if(amount) {
        if (isNaN(amount) || amount <= 0){
        alert('Please enter a valid amount');
        handleCloseModal();
      }
      else{
        const formData = new FormData();
        formData.append('amount', amount);
        axios.post('http://localhost:8080/credit_money', formData)
        .then(response => {
          if(response.data.message == true){
            // setError('Successful.');
            handleCloseModal();
            navigate('/transaction', { state: { depositAmount: amount } });
          }
          else if(response.data.message == false){
            alert('Transaction Failed.');
            handleCloseModal();
          }
          else{
            alert('Some Unexpected Error occurred! Please Login Again.');
            handleCloseModal();
          }
        })
        .catch(error => {
          alert("Error: "+error.message);
          handleCloseModal();
        })
      }
    }
    else{
      alert("Please mention some amount.");
      handleCloseModal();
    }
    }
    else if(action == 'Check Balance'){
      navigate('/balance')
    }
    else if(action == 'Transaction History'){
      navigate('/history')
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.post('http://localhost:8080/get_info')
    .then(response => {
      if (response.data.message == 'Success' && response.data.face_status){
        setInfo(response.data.user_db)
      }
      else{
        axios.post('http://localhost:8080/logout')
        navigate('/')
      }
    })
    .catch(error => {
      setInfo("Error")
      navigate('/Unreach')
    })
  },[])


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-6">
      <div className="text-4xl font-bold mt-5">WELCOME {info?.name?.toUpperCase() || 'Loading...'}!</div>
      <Acc account_no = {info._id}/>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="bg-blue-500 text-white py-6 px-4 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
          onClick={() => navigate('/Withdraw')} >
          <div className="flex items-center space-x-2">
          <img src='/cash-withdrawal 2.png' alt='withdraw' height={56} width={56}/>
            <span className='font-bold'>Withdraw Money</span>
          </div>
        </button>
        <button className="bg-green-500 text-white py-10 px-9 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
         " onClick={() => navigate('/Deposit')}>
          <div className="flex items-center space-x-2">
          <img src='/deposit 2.png' alt='Deposit' height={56} width={56}/>
            <span className="font-bold">Deposit Money</span>
          </div>
        </button>
        <button className="bg-yellow-500 text-white py-10 px-4 rounded shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        onClick={() => navigate('/Balance')}>
          <div className="flex items-center space-x-2">
          <img src='/cash 1.png' alt='Check Balance' height={56} width={56}/>
            <span className='font-bold'>Check Balance</span>
          </div>
        </button>
        <button className="bg-red-500 text-white py-10 px-12 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={() => navigate('/History')}>
          <div className="flex items-center space-x-2">
          <img src='/evaluation (1) 1.png' alt='Transaction History' height={56} width={56}/>
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
        action={action}
      />
      </div>
    </div>
  );
}

export default Deposit;
