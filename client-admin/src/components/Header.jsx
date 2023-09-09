import { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import UserCircle from "./icons/UserCircle";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("access_token");
    setIsLogin(false);
    navigate("/login");
  };

  const watchLocalStorage = () => {
    if (localStorage.access_token) setIsLogin(true);
    else setIsLogin(false);
  };

  useEffect(() => {
    watchLocalStorage();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clickBackdrop = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
        <div className="w-1/2"></div>
        <div className="relative w-1/2 flex justify-end">
          <button
            onClick={toggleMenu}
            className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-green-400 hover:border-green-300 focus:border-green-300 dark:border-green-300 dark:hover:border-green-400 dark:focus:border-green-400 focus:outline-none"
          >
            <UserCircle />
          </button>
          {isMenuOpen && (
            <>
              <button
                onClick={clickBackdrop}
                className="h-full w-full fixed inset-0 cursor-default"
              ></button>
              <div className="absolute w-28 z-10 bg-white rounded-lg shadow-lg py-2 mt-16 text-center">
                <NavLink
                  to={"/register"}
                  className="block px-4 py-2 account-link"
                >
                  Register
                </NavLink>
                {isLogin && (
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 account-link cursor-pointer"
                  >
                    Logout
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
