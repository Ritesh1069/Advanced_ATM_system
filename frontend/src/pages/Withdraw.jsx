import React from 'react'

const Withdraw = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute top-4 right-4 bg-blue-200 p-2 rounded">
        <span className="text-sm text-gray-600">Acc No : 436495365965</span>
      </div>
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
          className="w-full p-2 border border-gray-300 rounded bg-slate-300"
        />
      </div>
    </div>
  )
}

export default Withdraw
