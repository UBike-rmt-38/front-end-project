import React from 'react'

export default function BicycleTrow({ bicycle }) {
  return (
      <div className='bg-white shadow-md my-5'>
        <div className='p-4 text-black'>
          <div>
            <h1>{bicycle.name}</h1>
          </div>
          <div className=' w-20'>
            {bicycle.status ? <h1 className='bg-green-500 text-white text-center p-1 rounded-2xl'>Available</h1> : <h1 className='text-white bg-red-500 p-1 text-center rounded-2xl'>Used</h1>}
          </div>
        </div>
      </div>
  )
}
