import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct, putProduct } from "../stores/actions/actionCreator";
import ArrowPath from "./icons/ArrowPath";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductForm({
  isEdit,
  categories,
  loadingCategories,
  product,
  isLoading,
}) {
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    categoryId: "",
    imgUrl1: "",
    imgUrl2: "",
    imgUrl3: "",
    imgUrl4: "",
    imgUrl5: "",
    imgUrl6: "",
    imgUrl7: "",
    imgUrl8: "",
    imgUrl9: "",
    imgId1: "",
    imgId2: "",
    imgId3: "",
    imgId4: "",
    imgId5: "",
    imgId6: "",
    imgId7: "",
    imgId8: "",
    imgId9: "",
  });

  const resetInput = () => ({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    categoryId: "",
    imgUrl1: "",
    imgUrl2: "",
    imgUrl3: "",
    imgUrl4: "",
    imgUrl5: "",
    imgUrl6: "",
    imgUrl7: "",
    imgUrl8: "",
    imgUrl9: "",
    imgId1: "",
    imgId2: "",
    imgId3: "",
    imgId4: "",
    imgId5: "",
    imgId6: "",
    imgId7: "",
    imgId8: "",
    imgId9: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product.Images) {
      const images = product.Images.map((value, index) => {
        return {
          [`imgId${index + 1}`]: value.id,
          [`imgUrl${index + 1}`]: value.imgUrl,
        };
      });
      let initialInput = {
        name: product.name,
        description: product.description,
        price: product.price,
        mainImg: product.mainImg,
        categoryId: product.categoryId,
      };
      images.forEach((image) => {
        initialInput = { ...initialInput, ...image };
      });
      setInput(initialInput);
    }
  }, [product]);

  const onChangeInput = (event) => {
    const value = event.target.value;
    const eventInputName = event.target.name;
    if (eventInputName === "price") {
      const floatPrice = parseFloat(value, 10);
      setInput({ ...input, price: floatPrice });
    } else {
      const eventInputValue =
        eventInputName === "categoryId" ? parseInt(value) : value;
      setInput({ ...input, [eventInputName]: eventInputValue });
    }
  };

  const processData = () => {
    const images = [];
    for (let i = 1; i <= 9; i++) {
      const imgIdKey = `imgId${i}`;
      const imgUrlKey = `imgUrl${i}`;
      if (input[imgUrlKey] && isEdit && input[imgUrlKey] !== "") {
        images.push({ id: input[imgIdKey], imgUrl: input[imgUrlKey] });
      } else if (input[imgUrlKey] !== "") {
        images.push({ imgUrl: input[imgUrlKey] });
      }
    }
    const body = {
      name: input.name,
      description: input.description,
      price: input.price,
      mainImg: input.mainImg,
      categoryId: input.categoryId,
      images,
    };
    return body;
  };

  const addProduct = async () => {
    try {
      const body = processData();
      const { statusText, status, message } = await dispatch(postProduct(body));
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setInput(resetInput());
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const { statusText, status, message } = error;
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editProduct = async () => {
    try {
      const body = processData();
      const { statusText, status, message } = await dispatch(
        putProduct(product.id, body)
      );
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setInput(resetInput());
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const { statusText, status, message } = error;
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isEdit === true ? editProduct(product.id) : addProduct();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-10 bg-white rounded shadow-xl ${
        isEdit && isLoading ? "animate-pulse" : ""
      }`}
    >
      {isEdit && isLoading ? (
        <div className="flex items-center">
          <div className="w-10 h-10">
            <ArrowPath />
          </div>
          <div className="ml-3">
            <h1 className="w-full text-3xl text-black">Processing...</h1>
          </div>
        </div>
      ) : (
        <h1 className="w-full text-3xl text-black pb-6">
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>
      )}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.name}
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Product Name"
              : "Product Name"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.price}
            type="number"
            step="0.01"
            name="price"
            id="floating_price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit ? (isLoading ? "Loading..." : "Price") : "Price"}
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.mainImg}
            type="url"
            name="mainImg"
            id="floating_mainImg"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="mainImg"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit ? (isLoading ? "Loading..." : "Main Image") : "Main Image"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <select
            onChange={onChangeInput}
            value={input.categoryId}
            name="categoryId"
            id="floating_categoryId"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          >
            {loadingCategories ? (
              <>
                <option>Loading...</option>
              </>
            ) : (
              <>
                <option value={""} disabled>
                  Select Category
                </option>
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
          <label
            htmlFor="categoryId"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit ? (isLoading ? "Loading..." : "Category") : "Category"}
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          onChange={onChangeInput}
          value={input.description}
          name="description"
          id="floating_description"
          cols="30"
          rows="3"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="description"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {isEdit ? (isLoading ? "Loading..." : "Description") : "Description"}
        </label>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl1}
            type="url"
            name="imgUrl1"
            id="floating_imgUrl1"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="imgUrl1"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl2}
            type="url"
            name="imgUrl2"
            id="floating_imgUrl2"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl2"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl3}
            type="url"
            name="imgUrl3"
            id="floating_imgUrl3"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl3"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl4}
            type="url"
            name="imgUrl4"
            id="floating_imgUrl4"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl4"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl5}
            type="url"
            name="imgUrl5"
            id="floating_imgUrl5"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl5"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl6}
            type="url"
            name="imgUrl6"
            id="floating_imgUrl6"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl6"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl7}
            type="url"
            name="imgUrl7"
            id="floating_imgUrl7"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl7"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl8}
            type="url"
            name="imgUrl8"
            id="floating_imgUrl8"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl8"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChangeInput}
            value={input.imgUrl9}
            type="url"
            name="imgUrl9"
            id="floating_imgUrl9"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="imgUrl9"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {isEdit
              ? isLoading
                ? "Loading..."
                : "Additional Image"
              : "Additional Image"}
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isEdit ? "Update" : "Submit"}
      </button>
    </form>
  );
}
