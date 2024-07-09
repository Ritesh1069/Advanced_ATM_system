import React from 'react';
import { useState, useEffect } from 'react'

const Modal = ({ isOpen, onClose, onConfirm, amount ,action}) => {
  const [actionresponse,setActionresponse] = useState(null);
    const temp = () => {
    return <>
    {/* <p className="mb-4">Please confirm the amount</p> */}
      <p className="text-2xl font-bold mb-4">{amount? "£"+amount : null}</p>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setActionresponse(null); 
            onClose(); }}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Confirm
        </button>
      </div></>
  }
  useEffect(() => {
    if(action == "Credit" || action == "Debit" || action == "Check Balance" || action == "Transaction History"){
      setActionresponse(temp)
    }
    else{
      setActionresponse(null)
    }
  })

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-3xl font-bold mb-4">{action? action+" ?": "Listening..."}</h2>
        {/* {action? actionresponse : <button onClick={()=>setActionresponse(temp)}>click me</button> } */}
        {actionresponse}
        {/* <p className="mb-4">Please confirm the amount</p>
        <p className="text-2xl font-bold mb-4">{amount}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
