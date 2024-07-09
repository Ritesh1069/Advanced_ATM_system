import React from 'react';
import Acc from '../components/Acc';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// history

const TransactionHistory = () => {
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  const transactions = info.history ? info.history.map(item => {
    const [date, time, action, amount] = item.split('  ');
    return { date, time, action, amount };
  }) : ['Loading'];

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
  },[])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <Acc account_no = {info._id} />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Transaction History</h1>
        <div className="overflow-x-auto  ">
          <table className="min-w-full bg-white border text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Date</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Time</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Action</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Amount (£)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">{info.history? transaction.date : 'Loading...'}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{info.history? transaction.time : 'Loading...'}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{info.history? transaction.action : 'Loading...'}</td>
                  <td className="py-2 px-4 border-b border-gray-200 ">{info.history? transaction.amount : 'Loading...'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-center items-center'>
          <button
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 px-6"
          onClick={() => navigate('/home')}
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

