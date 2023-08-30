import React from 'react'

export default function BicycleTrow({ bicycle }) {
  return (
      <div className='bg-white shadow-md my-5'>
        <div className='p-4 text-black'>
          <div>
            <h1>{bicycle.name}</h1>
          </div>
          <div>
            {bicycle.status ? <h1 className=' text-green-500'>Available</h1> : <h1 className='text-red-500'>Used</h1>}
          </div>
        </div>
      </div>
  )
}
