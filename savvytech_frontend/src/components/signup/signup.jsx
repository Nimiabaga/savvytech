import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { toast } from "react-toastify";
import logoImage from "../../assets/logo.jpg";
import { authApiRequests } from "../../api";


const Signup = () => {
  // Initialize state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const newUser = {
      username:name,
      email,
      password,
    };
  
    try {
      const response = await authApiRequests.createUser(newUser);
      toast.success(response.data.message);
      navigate("/login");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-row">
      {/* Left side: Logo */}
      <div className="w-1/2 bg-white-500 flex justify-center items-center p-8">
        <img src={logoImage} alt="Logo" className="w-3/4 h-auto" />
      </div>

      {/* Right side: Form */}
      <div className="w-1/2 p-8">
        <div className="">
          <h2 className="text-center text-3xl font-extrabold text-black mb-6">
            Create An Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white-400 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="someone@gmail.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <MdOutlineAlternateEmail
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="password"
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

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-500"
                >
                  {loading ? "Creating..." : "Create An Account"}
                </button>
              </div>

              <div>
                <h4 className="text-black">Already have an account?</h4>
                <Link to="/login">
                  <button
                    type="button"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-500"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
