import { NavLink, useNavigate } from "react-router-dom";
import './Sidebar.css'
import Plus from "./icons/Plus";

export default function Sidebar() {
  const navigate = useNavigate()

  const handleAddProductClick = () => {
    navigate("/addproduct")
  }

  return (
    <>
      <aside id="sidebar" className="relative bg-teal-500 h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <a
            href="#"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
          <button onClick={handleAddProductClick} className="w-full bg-white text-teal-600 font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i className="mr-3"><Plus /></i> Add Product
          </button>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <NavLink to="/" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-teal-600">
          <i className="fas fa-tachometer-alt mr-3"></i>
            Stasion List
          </NavLink>
          <NavLink to="/categories" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-teal-600">
          <i className="fas fa-tachometer-alt mr-3"></i>
            Categories List
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
