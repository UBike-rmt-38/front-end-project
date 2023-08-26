import { useEffect } from "react";
// import { deleteProduct, fetchProducts } from "../stores/actions/actionCreator";
// import { useDispatch, useSelector } from "react-redux";
import TableRow from "../components/TableRow";
import TableRowLoading from "../components/TableRowLoading";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { gql, useQuery } from "@apollo/client";

const GET_STATIONS = gql`
  query GetStations {
    getStations {
      id
      name
      address
      latitude
      longtitude
      Bicycles {
        id
        name
        feature
        imageURL
        description
        price
        StationId
        status
      }
    }
  }
`;

export default function HomePage() {
  const { data, loading: isLoading, error } = useQuery(GET_STATIONS);
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <ToastContainer />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full leading-normal w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Latitude
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Longitude
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Updated At
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableRowLoading />
            ) : (
              <TableRow
                data={data.getStations}
                isStation={false}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
