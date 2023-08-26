import { useMutation } from "@apollo/client";
import { ADD_STATIONS } from "../constants/mutation";
import { useState } from "react";

export default function StationForm() {
  const [input, setInput] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [addStation, { loading }] = useMutation(ADD_STATIONS);

  const resetInput = () => ({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addStation({
        variables: {
          name: input.name,
          address: input.address,
          latitude: input.latitude,
          longitude: input.longitude,
        },
      });

      if (data.addStation) {
        toast.success("Station added successfully!", {
        });
        setInput(resetInput());
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message, {
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl">
      <h1 className="w-full text-3xl text-black pb-6">Add Station</h1>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.name}
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Station Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.address}
            type="text"
            name="address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Address
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.latitude}
            type="text"
            name="latitude"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="latitude" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Latitude
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.longitude}
            type="text"
            name="longitude"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="longitude" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Longitude
          </label>
        </div>
      </div>
      <button type="submit" className="...">
        Add Station
      </button>
    </form>
  );
}
