import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader } from "lucide-react";
import axios from "axios";
import UserContext from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validation
    if (!email.trim() || !password.trim()) {
      showMessage("error", "❌ Please enter both email and password");
      return;
    }

    if (!validateEmail(email)) {
      showMessage("error", "❌ Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      showMessage("error", "❌ Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/users/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log(res.data);

      // Save user in context
      setUser(res.data.data.user);

      showMessage("success", "✅ Login successful! Redirecting...");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/DashboardHome");
      }, 1500);

    } catch (error) {
      console.log(error.response?.data);
      const errorMsg = error.response?.data?.message || "Login failed";

      if (error.response?.status === 401) {
        showMessage("error", "❌ Invalid email or password. Please check and try again.");
      } else if (error.response?.status === 404) {
        showMessage("error", "❌ Account not found. Please create a new account.");
      } else {
        showMessage("error", `❌ ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center px-4 py-8">
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-container { animation: slideInUp 0.6s ease-out; }
        .message-box { animation: slideInDown 0.4s ease-out; }
        .input-focus:focus { 
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }
        .btn-loading { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      {/* Message Box */}
      {message.text && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 message-box ${
            message.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-400"
              : "bg-red-500/20 border border-red-500/50 text-red-400"
          } px-6 py-3 rounded-lg font-semibold flex items-center gap-2`}
        >
          {message.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </div>
      )}

      <div className="form-container w-full max-w-md">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="input-focus w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-green-400 hover:text-green-300 font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-focus w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-green-500/20 bg-slate-700/50 text-green-500 focus:ring-green-500 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                loading ? "btn-loading scale-100" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-400 hover:text-green-300 font-semibold transition"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-gray-400 text-xs mt-6">
          By logging in, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default Login;