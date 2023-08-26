import ArrowPath from "./icons/ArrowPath";

export default function TableRowLoading() {
  return (
    <tr className=" animate-pulse bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center">
          <div className="w-10 h-10">
            <ArrowPath />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">Processing...</p>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">Loading...</td>
      <td className="px-6 py-4">Loading...</td>
      <td className="px-6 py-4">Loading...</td>
      <td className="px-6 py-4">Loading...</td>
      <td className="px-6 py-4">Loading...</td>
      <td className="flex items-center px-6 py-4 space-x-3">
        <ArrowPath dynamicClassName=" stroke-green-600 dark:stroke-green-500" />
        <ArrowPath dynamicClassName=" stroke-red-600 dark:stroke-red-500" />
      </td>
    </tr>
  );
}
