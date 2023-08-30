import TableRow from "../components/TableRow";
import TableRowLoading from "../components/TableRowLoading";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@apollo/client";
import Plus from "../components/icons/Plus";
import {GET_STATIONS} from '../constants/query'
export default function HomePage() {
  const navigate = useNavigate()

  const handleAddProductClick = () => {
    navigate("/addstation")
  }
  const { data, loading: isLoading, error } = useQuery(GET_STATIONS);
  if (error) return `Error! ${error.message}`;

  const handleDetail = (id) => {
    navigate("/" + id)
  }

  return (
    <>
      <ToastContainer />
      <button onClick={handleAddProductClick} className="w-40 mb-8 bg-white text-teal-600 font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
        <i className="mr-3"><Plus /></i> Add Station
      </button>
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
                handleDetail={handleDetail}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
