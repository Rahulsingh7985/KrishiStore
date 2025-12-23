import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/users/login`,
        { email, password },
        { withCredentials: true } // cookies ke liye
      );

      console.log(res.data);

      // Save user in context
      setUser(res.data.data.user);

      alert("Login Successful");
      // Redirect to home page
      navigate("/DashboardHome");

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-700 hover:underline">
            Create one
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-[#f1f0f5] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-purple-500" />
              Remember me
            </label>
            <Link to="/forgot-password" className="hover:text-purple-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold text-white transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
