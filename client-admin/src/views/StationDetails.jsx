import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { GET_STATION_DETAIL } from '../constants/query'
import BicycleTrow from '../components/BicycleTrow';
import TableRowLoading from '../components/TableRowLoading';


export default function StationDetails() {
  const { stationId } = useParams();
  const { data, loading, error } = useQuery(GET_STATION_DETAIL, {
    variables: { stationId: +stationId }
  })

  const station = data?.getStationsById;

  if (loading) {
    return <TableRowLoading />
  }

  return (
    <>
      <div className='px-10 py-12 bg-white rounded-lg'>
        <div className='justify-center text-center text-black'>
          <div className='mb-10'>
            <h1 className=' text-3xl font-bold'>{station?.name}</h1>
          </div>
          <div className='font-semibold mb-14'>
            <h1>{station?.address}</h1>
          </div>
          <div className='grid grid-cols-2 mb-10'>
            <div className='col-span-1 border-r-2 border-black'>
              <h1 className='my-2 py-2 font-semibold'>LATITUDE</h1>
              <h1 className='text-green-500 font-bold'>{station?.latitude}</h1>
            </div>
            <div className='col-span-1 border-l-2 border-black'>
              <h1 className='my-2 py-2 font-semibold'>LONGITUDE</h1>
              <h1 className='text-green-500 font-bold'>{station?.longitude}</h1>
            </div>
          </div>
        </div>
        <div className='text-center text-black mb-5'>
          <h1 className='text-2xl font-semibold'>Bicyle List</h1>
        </div>
        {station?.Bicycles.length < 1 ?
          <div className='py-5'>
            <h1 className='text-black text-center'>No Available Bicycle</h1>
          </div>
          :
          <div className=" h-52  overflow-y-scroll border w-full">
            {station?.Bicycles?.map((bicycle) => {
              return (<BicycleTrow bicycle={bicycle} key={bicycle.id} />)
            })}
          </div>
        }
      </div>
    </>
  )
}
