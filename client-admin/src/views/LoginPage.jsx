import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { postLogin } from "../stores/actions/actionCreator";
import { ToastContainer, toast } from "react-toastify";

export default function LoginPage() {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const onLoginInput = (event) => {
    const value = event.target.value;
    const eventLoginInput = event.target.name;
    setFormLogin({ ...formLogin, [eventLoginInput]: value });
  };

  const LOGIN = gql`
    mutation Mutation($username: String!, $password: String!) {
      login(username: $username, password: $password)
    }
  `;

  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // const { statusText, status, message } = await dispatch(
      //   postLogin(formLogin)
      // );
      // console.log("ketrigger")
      await login({ variables: formLogin });
      localStorage.setItem("access_token", data.login);
      console.log(data);
      setFormLogin({
        username: "",
        password: "",
      });
      toast.success("login success!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      // const { statusText, status, message } = error;
      console.log(error);
    }
  };

  if (error) {
    console.log(error)
    toast.error(error, {
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

  return (
    <>
      <ToastContainer />
      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6 bg-BrightMint min-h-screen">
          <div className="w-1/2 mx-auto">
            <div className="leading-loose">
              <form
                onSubmit={handleSubmit}
                className="p-10 bg-white rounded shadow-xl"
              >
                <h1 className="w-full text-3xl text-black pb-6">Login</h1>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onLoginInput}
                    value={formLogin.username}
                    type="username"
                    name="username"
                    id="floating_username"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="username"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Username
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onLoginInput}
                    value={formLogin.password}
                    type="password"
                    name="password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
