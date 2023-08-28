import Pencil from "./icons/Pencil";
import Trash from "./icons/Trash";

export default function TableRow({
  isStation,
  data,
  onEditClick,
  onDeleteClick,
}) {
  const columns = isStation
    ? [
        
      ]
    : [
        { key: "name" },
        { key: "address" },
        { key: "latitude" },
        { key: "longitude" },
        { key: "createdAt" },
        { key: "updatedAt" },
      ];

  return (
    <>
      {data.map((el) => (
        <tr
          key={el.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {columns.map((column, index) => (
            <td
              key={column.key}
              className={`px-6 py-4 ${
                index === 0
                  ? "font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  : ""
              }`}
            >
              {column.key === "mainImg" || column.key === "name" ? (
                <div className="flex items-center">
                  {isStation && (
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={el.mainImg}
                        alt=""
                      />
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {el.name}
                    </p>
                  </div>
                </div>
              ) : column.nestedKey ? (
                el[column.key][column.nestedKey]
              ) : (
                el[column.key]
              )}
            </td>
          ))}
          <td className="flex justify-around items-center px-6 py-6 space-x-3">
            <div onClick={() => onEditClick(el.id)}>
              <Pencil />
            </div>
            <div onClick={() => onDeleteClick(el.id)}>
              <Trash />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
