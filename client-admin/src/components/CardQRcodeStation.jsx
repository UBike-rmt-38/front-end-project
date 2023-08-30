import React from 'react'
import CardQRcodeBicycle from './CardQRcodeBicycle'

export default function CardQRcode({ data }) {
  return (
    <div className='bg-white p-5 py-10 m-5 rounded-lg border-BrightMint border-2'>
      <div className='text-black mb-10 pb-5 border-b-4 border-BrightMint'>
        <h1 className='text-2xl font-bold text-center'>{data.name}</h1>
      </div>
      <div className="card card-compact w-96 bg-white shadow-xl m-4 border-slate-200 border-4">
        <div className='py-5'>
          <figure><img src={data.qrCode} alt="Shoes" /></figure>
        </div>
        <div className="card-body bg-slate-200 rounded-lg">
          <h2 className="card-title text-black font-medium ">Station QR</h2>
        </div>
      </div>
      <div className='mt-12'>
        <div className='ml-5'>
          <h1 className='text-black font-bold text-lg'>Bicycle QR</h1>
        </div>
        {data.bicycleQrcode.length < 1 ?
          <div className='py-5 m-5'>
            <h1 className='text-black text-md font-semibold'>No Available Bicycle</h1>
          </div> :
          <div className="grid grid-cols-3 gap-12 justify-center grid-template-rows">
            {
              data.bicycleQrcode.map(e => {
                return <CardQRcodeBicycle data={e} key={e.id} />
              })
            }
          </div>
        }
      </div>
    </div>
  )
}
