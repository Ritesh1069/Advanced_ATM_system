import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Acc from '../components/Acc';
import { useState, useEffect } from 'react'
import axios from 'axios';
// Withdraw confirmation
const Moneywithdraw = () => {
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Acc account_no = {info._id}/>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <div className="flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-lg font-semibold mb-2">Successfully Withdrawn</p>
        <p className="text-2xl font-bold">{amount} Rs</p>
        <button 
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 px-6"  
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Moneywithdraw;


