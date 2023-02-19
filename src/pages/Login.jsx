import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useStateContext } from "../context/StateContext";

const Login = () => {
  const history = useHistory();
  const { loginUser } = useStateContext();
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-[#e94560] ">
          Sign in
        </h1>
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            if (auth.email && auth.password) {
              loginUser(auth);
              setLoading(false);
              toast.success("Logged in successfully");
              history.push("/");
            } else {
              toast.error("Please fill in all fields");
              setLoading(false);
            }
          }}
        >
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              placeholder="Enter email"
              value={auth.name}
              required
              onChange={(e) =>
                setAuth((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              className="block w-full px-4 py-2 mt-2 text-[#e94560] bg-white border rounded-md focus:border-pink-400 focus:ring-[#e58494] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              placeholder="Enter password"
              value={auth.password}
              required
              onChange={(e) =>
                setAuth((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              className="block w-full px-4 py-2 mt-2 text-[#e94560] bg-white border rounded-md focus:border-[#e58494] focus:ring-[#e58494] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              disabled={loading}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#e94560] rounded-md hover:bg-[#f93758] focus:outline-none focus:bg-[#e58494]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
