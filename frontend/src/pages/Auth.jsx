import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

function AuthPage() {
  const [account_number, setNo] = useState(null);
  const [account_pin, setPin] = useState(null);
  const [error, setError] = useState("Hello"); 
  const navigate = useNavigate();

  const handleAccountNoChange = (event) => {
    setNo(event.target.value);
  };

  const handleAccountPinChange = (event) => {
    setPin(event.target.value);
  };

  const AuthUser = (event) => {
    event.preventDefault();
    if(account_number && account_pin){
      const formData = new FormData();
      formData.append('account_no', account_number);
      formData.append('account_pin', account_pin);
      axios.post('http://localhost:8080/account_login', formData)
      .then(response => {
        if(response.data.message=='Login Successful'){
          navigate('/face');
        }
        else(
          setError("Invalid Account Number or Pin")
        )
      })
    
    }
    else{
      setError("Please enter all the details")
    }
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   navigate('/protected');
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Easy ATM</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Enter your Account number</label>
            <input 
              type="text" 
              name="accountNumber" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleAccountNoChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Enter your Account PIN</label>
            <input 
              type="password" 
              name="accountPin" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleAccountPinChange}
            />{<p className="text-red-500 mt-2">{error}</p>}
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              // onClick={() => navigate('/face')}      
              onClick={AuthUser}
              >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;





