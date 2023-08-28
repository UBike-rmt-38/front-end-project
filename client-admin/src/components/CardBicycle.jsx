/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { DELETE_BICYCLES } from '../constants/mutation';

export default function CardBicycle({ bicycle }) {
  const [deleteBicycle] = useMutation(DELETE_BICYCLES);

  const handleDelete = () => {
    deleteBicycle({ variables: { bicycleId: bicycle.id } })
      .then(() => {
        console.log('Bicycle deleted successfully');
      })
      .catch(error => {
        console.log('Error deleting bicycle:', error);
      });
  };

  return (
    <>
      <div className="card card-compact w-96 bg-white shadow-xl">
        <figure><img src={bicycle.imageURL} alt="Bicycle" /></figure>
        <div className="card-body">
          <h2 className="card-title text-black h-10">{bicycle.name}</h2>
          <p>{bicycle.feature}</p>
          <p>{bicycle.status}</p>
          <div className="card-actions justify-between">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-error text-white" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
