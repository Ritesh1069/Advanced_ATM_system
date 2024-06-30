import React from 'react'

const Deposit = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute top-4 right-4 bg-blue-200 p-2 rounded">
        <span className="text-sm text-gray-600">Acc No : 436495365965</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-blue-500 text-white py-6 px-4 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <div className="flex items-center space-x-2">
            <span>Withdraw Money</span>
          </div>
        </button>
        <button className="bg-green-500 text-white py-10 px-9 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          <div className="flex items-center space-x-2">
            <span>Deposit Money</span>
          </div>
        </button>
        <button className="bg-yellow-500 text-white py-10 px-4 rounded shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
          <div className="flex items-center space-x-2">
            <span>Check Balance</span>
          </div>
        </button>
        <button className="bg-red-500 text-white py-10 px-12 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
          <div className="flex items-center space-x-2">
            <span>Transactions Statement</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Deposit
