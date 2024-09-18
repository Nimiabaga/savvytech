import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthenticationContext";
import { authApiRequests } from "../../api";
import logoImage from "../../assets/logo.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = (await authApiRequests.loginUser(email, password)).data;
    const userInfo = userData.user;
      toast.success("Login Success!");
      login(userInfo);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl flex bg-white shadow-lg rounded-lg">
        {/* Logo Section */}
        <div className="w-1/2 bg-white-500 flex justify-center items-center p-8">
          <img src={logoImage} alt="Logo" className="w-3/4 h-auto" />
        </div>

        {/* Login Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-center text-3xl font-extrabold text-black mb-6">
            Log in to your Savvy Account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  placeholder="someone@gmail.com"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <MdAlternateEmail
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-black"
                >
                  Remember Password
                </label>
              </div>
              <div className="text-sm">
                <a href=".forgot-password" className="font-medium text-black">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-solid-red"
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </div>
            <div>
              <h4 className="text-black">Don't have an account?</h4>
              <Link to="/sign-up">
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-500"
                >
                  Create An Account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
