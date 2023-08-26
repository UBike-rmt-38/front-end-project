import React from 'react'

export default function CardBicycle({ bicycle }) {
  return (
    <>
      <div className="card card-compact w-96 bg-white shadow-xl">
        <figure><img src={bicycle.imageURL} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title text-black h-10">{bicycle.name}</h2>
          <p>{bicycle.feature}</p>
          <p>{bicycle.status}</p>
          <div className="card-actions justify-between">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-error text-white">Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}


