import { Link, NavLink, useNavigate } from "react-router-dom";
import './Sidebar.css'

export default function Sidebar() {

  return (
    <>
      <aside id="sidebar" className="relative bg-teal-500 h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <Link to={'/'}>
            <i
              className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Ubike
              Admin
            </i>
          </Link>
          
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <NavLink to="/" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-teal-600">
            <i className="fas fa-tachometer-alt mr-3"></i>
            Stasion List
          </NavLink>
          {/* <NavLink to="/categories" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-teal-600">
            <i className="fas fa-tachometer-alt mr-3"></i>
            Categories List
          </NavLink> */}
          <NavLink to="/bicycles" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-teal-600">
            <i className="fas fa-tachometer-alt mr-3"></i>
            Bicycles List
          </NavLink>
          <NavLink to="/report" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-teal-600">
            <i className="fas fa-tachometer-alt mr-3"></i>
            Weekly Report
          </NavLink>
          <NavLink to="/qrcode" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 hover:bg-teal-600">
            <i className="fas fa-tachometer-alt mr-3"></i>
            QRcode
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
