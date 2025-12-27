import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import UserContext from "../../context/UserContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Calculate password strength
  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/\d/)) strength++;
    if (pwd.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showMessage("error", "❌ Name is required");
      return false;
    }
    if (!formData.address.trim()) {
      showMessage("error", "❌ Address is required");
      return false;
    }
    
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(formData.email)) {
      showMessage("error", "❌ Only valid Gmail address is allowed");
      return false;
    }
    
    if (formData.password.length < 6) {
      showMessage("error", "❌ Password must be at least 6 characters");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v2/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            password: formData.password,
            address: formData.address,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showMessage("error", `❌ ${data.message || "Registration failed"}`);
        return;
      }

      setUser(data.data);
      showMessage("success", "✅ Account created successfully!");
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      showMessage("error", "❌ Network error. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-300";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "No password";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
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
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 message-box ${
          message.type === "success" 
            ? "bg-green-500/20 border border-green-500/50 text-green-400" 
            : "bg-red-500/20 border border-red-500/50 text-red-400"
        } px-6 py-3 rounded-lg font-semibold flex items-center gap-2`}>
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              🌾 Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join us to access quality agricultural products
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input-focus w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="input-focus w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Gmail Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@gmail.com"
                  className="input-focus w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password (min 6 characters)"
                  className="input-focus w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-green-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Password Strength</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength === 4 ? "text-green-400" :
                      passwordStrength === 3 ? "text-yellow-400" :
                      "text-orange-400"
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 ${
                loading ? "btn-loading scale-100" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition">
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-gray-400 text-xs mt-6">
          By registering, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default Register;