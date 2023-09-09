import { useQuery } from '@apollo/client';
import { GET_BICYCLES, GET_RENTAL_REPORT, GET_USERS } from '../constants/query';
import { formatDate } from '../helpers/FormatDate';

export default function WeeklyReport(){
  const { loading: reportLoading, error: reportError, data: reportData } = useQuery(GET_RENTAL_REPORT);
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);
  const { loading: bicyclesLoading, error: bicyclesError, data: bicyclesData } = useQuery(GET_BICYCLES);

  if (reportLoading || usersLoading || bicyclesLoading) return <p>Loading...</p>;
  if (reportError || usersError || bicyclesError) return <p>Error: Something went wrong.</p>;

  
  const rentalReports = reportData.getRentalReport;
  const users = usersData.getUsers;
  const bicycles = bicyclesData.getBicycles;

  return (
    <div>
      <h1 className="w-40 mb-8 bg-white text-teal-600 font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg flex items-center justify-center">
            <i className="mr-3">
            </i>
            Weekly Report
        </h1>

      <div className="shadow-lg rounded-xl p-4 bg-white dark:bg-gray-800 w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                User
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Bicycle
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Travelled Distance
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Total Price
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Transaction
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Created At
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Updated At
              </th>
            </tr>
            </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
            {rentalReports.map(report => {
              const user = users.find(user => user.id === report.UserId);
              const bicycle = bicycles.find(bicycle => bicycle.id === report.BicycleId);

              return (
                <tr className='text-black text-sm' key={report.id}>
                  <td className="py-4 px-6 font-size-12">{report.status === true ? <p className='text-center bg-green-500 text-white p-2 rounded-md font-medium'>Completed</p> : <p className='text-center bg-yellow-500 text-white p-2 rounded-md font-medium'>Active</p>}</td>
                  <td className="py-4 px-6">{user ? user.username : 'N/A'}</td>
                  <td className="py-4 px-6">{bicycle ? bicycle.name : 'N/A'}</td>
                  <td className="py-4 px-6">{report.travelledDistance}</td>
                  <td className="py-4 px-6">{report.totalPrice}</td>
                  <td className="py-4 px-6">{report.transaction}</td>
                  <td className="py-4 px-6">{formatDate(report.createdAt)}</td>
                  <td className="py-4 px-6">{formatDate(report.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}