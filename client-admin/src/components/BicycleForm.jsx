/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BICYCLE, EDIT_BICYCLE } from "../constants/mutation";
import { GET_BICYCLES, GET_BICYCLE_BY_ID, GET_CATEGORIES, GET_STATIONS } from "../constants/query";
import { useNavigate, useParams } from "react-router-dom";

export default function BicycleForm() {
  const { id } = useParams();
  const navigate = useNavigate()
  const bicycle = {
    name: "",
    feature: "",
    imageUrl: "",
    description: "",
    price: 0,
    stationId: "",
    categoryId: "",
  };
  
  const [input, setInput] = useState(bicycle);
  const [addBicycle] = useMutation(ADD_BICYCLE);
  const [editBicycle] = useMutation(EDIT_BICYCLE);
  
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  const { loading: stationsLoading, error: stationsError, data: stationsData } = useQuery(GET_STATIONS);
  const { refetch } = useQuery(GET_BICYCLES)

  const { loading: bicycleLoading, error: bicycleError, data: bicycleData } = useQuery(GET_BICYCLE_BY_ID, {
    variables: { 
      bicycleId: +id },
    });
    
  useEffect(() => {
    if (id && bicycleData) {
      const { name, feature, imageURL, description, price, stationId, categoryId  } = bicycleData.getBicycleById;
      setInput({ name, feature, imageUrl: imageURL, description, price, stationId, categoryId  });
    }
  }, [bicycleData, id]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const inputData = {
        ...input,
        price: Number(input.price),
        stationId: Number(input.stationId),
        categoryId: Number(input.categoryId),
      };
      const bicycleId = Number(id)
      if (id) {
        await editBicycle({
          variables: {
            bicycleId,
            ...inputData,
          },

        });
      } else {
        await addBicycle({
          variables: {
            ...inputData,
          },
        });
      }
      setInput(bicycle);
      refetch()
      navigate('/bicycles');
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };


  return (
    <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl">
      <h1 className="w-full text-3xl text-black pb-6"></h1>
      <h2 className="text-2xl font-semibold mb-4 text-center">
          { id ? 'Edit Bicycle' : 'Add Bicycle'}
      </h2>
      <div className="relative z-0 w-full mb-6 group">
        <input
          onChange={handleInputChange}
          value={input.name || ""}
          type="text"
          name="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          onChange={handleInputChange}
          value={input.feature || ""}
          type="text"
          name="feature"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="feature"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Feature
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          onChange={handleInputChange}
          value={input.imageUrl || ""}
          type="text"
          name="imageUrl"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="imageUrl"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Image URL
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          onChange={handleInputChange}
          value={input.description || ""}
          type="text"
          name="description"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          onChange={handleInputChange}
          value={input.price}
          type="number"
          name="price"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="price"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Price
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="stationId"
          className="block text-sm font-medium text-gray-700"
        >
          Station:
        </label>
        <select
          id="stationId"
          name="stationId"
          onChange={handleInputChange}
          value={input.stationId || ""}
          className="block w-full mt-1 py-2.5 px-3 rounded-md text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          required
        >
          <option value="" disabled >
            Select a station
          </option>
          {stationsLoading ? (
            <option>Loading stations...</option>
          ) : stationsError ? (
            <option>Error loading stations</option>
          ) : (
            stationsData?.getStations.map((station) => (
              <option key={station?.id} value={station?.id}>
                {station?.name}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Category:
        </label>
        <select
          id="categoryId"
          name="categoryId"
          onChange={handleInputChange}
          value={input.categoryId || ""}
          className="block w-full mt-1 py-2.5 px-3 rounded-md text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categoriesLoading ? (
            <option>Loading categories...</option>
          ) : categoriesError ? (
            <option>Error loading categories</option>
          ) : (
            categoriesData.getCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button
        type="submit"
        className="w-40 mb-8 bg-white border-slate-200 border-2 text-teal-600 font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
      >
          { id ? 'Edit Bicycle' : 'Add Bicycle'}      
      </button>
    </form>
  );
}