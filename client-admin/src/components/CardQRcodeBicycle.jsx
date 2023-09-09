import React from 'react'

export default function CardQRcodeBicycle({ data }) {
  return (
    <div className="card card-compact w-96 bg-white shadow-xl m-4 broder-slate-200 border-4">
      <div className='py-5'>
        <figure><img src={data.qrCode} alt="Shoes" /></figure>
      </div>
      <div className="card-body bg-slate-200">
        <h2 className="card-title text-black h-10">{data.name}</h2>
      </div>
    </div>
  )
}
