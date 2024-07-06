import React from 'react'

const Acc = (props) => {
  return (
    <div className="absolute top-4 right-4 bg-blue-200 p-2 rounded">
        <span className="text-sm text-gray-600">Account No : {props.account_no}</span>
      </div>
  )
}

Acc.defaultProps= {
  account_no: "Error"
}

export default Acc
