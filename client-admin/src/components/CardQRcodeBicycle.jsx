import React from 'react'

export default function CardQRcodeBicycle({data}) {
  return (
    <div className="card card-compact w-96 bg-white shadow-xl m-4">
        <figure><img src={data.qrCode} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title text-black h-10">{data.name}</h2>
        </div>
      </div>
  )
}
