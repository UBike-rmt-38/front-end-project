import React from 'react'
import CardQRcodeBicycle from './CardQRcodeBicycle'

export default function CardQRcode({data}) {
  return (
    <>
    <div className="card card-compact w-96 bg-white shadow-xl m-4 broder-BrightMint" style={{ border: '10px solid black' }}>
        <figure><img src={data.qrCode} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title text-black h-10">Station: {data.name}</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 justify-center grid-template-rows">
        {
          data.bicycleQrcode.map(e => {
            return <CardQRcodeBicycle data={e} key={e.id}   />
          })
        }
      </div>
      </>
  )
}
