/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMutation } from "@apollo/client";
import { DELETE_BICYCLES } from "../constants/mutation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CardBicycle({ bicycle }) {

  const [editItem, setEditItem] = useState(null);


  const [deleteBicycle] = useMutation(DELETE_BICYCLES);
  const handleDelete = () => {
    deleteBicycle({ variables: { bicycleId: bicycle.id } })
      .then(() => {
        console.log("Bicycle deleted successfully");
      })
      .catch((error) => {
        console.log("Error deleting bicycle:", error);
      });
  };
  const handleEditClick = () => {
    setEditItem(bicycle.id);
    // console.log(bicycle);
};

  return (
    <>
      <div className="card card-compact w-96 flex-grow h-[500px] bg-white mx-4 my-5 shadow-2xl">
        <figure>
          <img src={bicycle.imageURL} alt="Bicycle" className="h-56"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-black h-10">{bicycle.name}</h2>
          <p>{bicycle.feature}</p>
          <p>{bicycle.status}</p>
          <div className="card-actions justify-between">
            <Link
              to={`/form/${bicycle.id}`}
              className="btn bg-purple-700 text-white border-white hover:bg-purple-400"
              onClick={handleEditClick} 
            >
              Edit
            </Link>
            <button className="btn bg-red-600 text-white border-white hover:bg-red-400" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
