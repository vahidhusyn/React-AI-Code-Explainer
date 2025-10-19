import React from 'react'

const CodeExplanation = ({explanation}) => {
  return (
    <div className='w-full max-w-4xl mt-6 bg-gray-500 p-6 rounded-2xl shadow-lg'>
      <h2 className='text-xl font-semibold mb-2'>Explanation:</h2>
      <p>{explanation}</p>
    </div>
  )
}

export default CodeExplanation
