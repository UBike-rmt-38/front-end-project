import React from 'react'
import TableRowLoading from "../components/TableRowLoading";
import { ToastContainer, toast } from "react-toastify";
import { gql, useQuery } from "@apollo/client";
import Plus from '../components/icons/Plus';
import CardBicycle from '../components/CardBicycle';
import { useNavigate } from 'react-router-dom';

const GET_BICYCLES = gql`
 query GetBicycles {
  getBicycles {
    id
    name
    imageURL
    feature
    status
  }
}
`;


export default function BicyclesListPage() {
  const navigate = useNavigate()
  const { data, loading: isLoading, error } = useQuery(GET_BICYCLES);
  if (error) return `Error! ${error.message}`;

  
  const handleAdd = () => {
    navigate("/addbicycle")
  }
  return (
    <>
      <ToastContainer />
      <button
        onClick={handleAdd}
        className="w-40 mb-8 bg-white text-teal-600 font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
        <i className="mr-3"><Plus /></i> Add Bicycle
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className='grid grid-cols-4 gap-x-3 gap-y-5'>
          {isLoading ? (
            <TableRowLoading />
          ) : (
            data.getBicycles.map((bicycle) => {
              return <CardBicycle bicycle={bicycle} key={bicycle.id} />
            })
          )}
        </div>
      </div>
    </>
  )
}
