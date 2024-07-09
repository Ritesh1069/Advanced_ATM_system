import React from 'react';
import Acc from '../components/Acc';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Face = () => {
  const [info, setInfo] = useState([]);
  const [message, setMessage] = useState(null);
  const [timer, setTimer] = useState(null);
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
      if (response.data['message'] == "Success"){
        setInfo(response.data.user_db)
      }
      else{
        axios.post('http://localhost:8080/logout')
        navigate('/')
      }
    })
    .catch(error =>{
      // setInfo({'account_no':'Error', 'error':error})
      setInfo("Error")
      navigate('/Unreach')
    })
  },[]);

  const authFace = () => {
    if(info.face_embedding){
      // setMessage("Success")
      setMessage("Checking Face...")
      axios.post('http://localhost:8080/face_auth')
      .then(response =>{
        if(response.data.message){
          setMessage("Success")
          navigate('/home')
        }
        else{
          setTimer(5)
          setInterval(() => {
            setTimer(prevTimer => prevTimer - 1)
          }, 1000);
          setMessage("Face did not match. Redirecting to Login Page in ")
          setTimeout(() => {
            axios.post('http://localhost:8080/logout')
            navigate('/')
          }, 5000);
        }
      })
      .catch(error =>{
        setMessage("Unable to open Camera.")
      }
      )
    }
    else{
      setMessage("Missing User's Face Data in DataBase.")
    }
}   
  // const getInfo = () => {
  //   axios.post('http://localhost:8080/get_info')
  //   .then(response => {
  //     setInfo(response.data.account_no)
  //   })
  //   .catch(error =>{
  //     setInfo("Error")
  //   })
  // }
//  if (info && info !== "Error") {
//     const { account_no, account_pin, message, user_db } = info;

//     // Check if user_db is defined before destructuring
//     if (user_db) {
//       const { _id, balance, face_embedding, history, name, password } = user_db;
  
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <Acc account_no = {info._id} />
      <div className='bg-indigo-500 w-56 h-56 rounded flex items-center justify-center'>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <div className='flex justify-center'>
        <button
          type="submit"
          className="py-2 px-10 mt-5 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={authFace}
        >
          Open camera
        </button>
      </div>
      {<p className="text-red-500 mt-2">{message}{timer}</p>}
    </div>
  );
}

export default Face;

