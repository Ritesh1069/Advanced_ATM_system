import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Acc from '../components/Acc';
import axios from 'axios';

// withdraw

const Withdraw = () => {
  const [info, setInfo] = useState([]);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'You will be logged out if you exit. Are you sure you want to leave?';
    };

    const handleUnload = () => {
      axios.post('http://localhost:8080/logout');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  
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
  },[amount])

  const handleSubmit = () =>{
    if(amount) {
      if (isNaN(amount) || amount <= 0){
      setError('Please enter a valid amount');
    }
    else{
      const formData = new FormData();
      formData.append('amount', amount);
      axios.post('http://localhost:8080/debit_money', formData)
      .then(response => {
        if(response.data.message == true){
          setError('Successful.');
          navigate('/moneywithdraw', { state: { amount: amount } });
        }
        else if(response.data.message == false){
          setError('Insufficient funds');
        }
        else{
          setError('Some Unexpected Error occurred! Please Login Again.');
        }
      })
      .catch(error => {
        setError("Error: "+error.message);
      })
    }
  }
  else{
    setError("Please enter some amount.");
  }  
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <Acc account_no = {info._id}/>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col">
        <h1 className="text-xl font-bold text-center mb-4">Withdraw money</h1>
        <div className="mb-4 flex justify-center items-center">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7V8a1 1 0 112 0v3h1a1 1 0 110 2h-4a1 1 0 110-2h1zm1 4a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
          </svg> */}
          <img src='/cash-withdrawal 2.png' alt='img'/>
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
     
    </div>
  );
};

export default Withdraw;


