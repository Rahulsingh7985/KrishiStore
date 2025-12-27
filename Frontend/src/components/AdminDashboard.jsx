import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Users, Package, UserCheck, AlertCircle, Search, TrendingUp, Calendar } from "lucide-react";
import UserContext from "../context/UserContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  const [allUsers, setAllUsers] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // -------------------------
  // Check Admin Authorization
  // -------------------------
  useEffect(() => {
    if (!user || user.role !== "admin") {
      setError("You are not authorized to access this page");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [user, navigate]);

  // -------------------------
  // Fetch All Users
  // -------------------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/users/all-users`,
          { withCredentials: true }
        );
        
        const users = response.data.data || [];
        setAllUsers(users);
        
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const active = users.filter(u => new Date(u.createdAt) > thirtyDaysAgo).length;
        setActiveUsers(active);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  // -------------------------
  // Fetch Total Products
  // -------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/posts`,
          { withCredentials: true }
        );
        
        const products = response.data.data || [];
        setTotalProducts(products.length);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // -------------------------
  // Filter Users
  // -------------------------
  const filteredUsers = allUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------
  // Loading State
  // -------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mb-4"></div>
          <p className="text-gray-300 font-medium">डैशबोर्ड लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  // -------------------------
  // Error State
  // -------------------------
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
          <p className="text-2xl font-bold text-white mb-2">{error}</p>
          <p className="text-gray-400">पुनः निर्देशित किया जा रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-6">
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .card-animate { animation: slideInUp 0.5s ease-out; }
        .stats-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .stats-card:hover { transform: translateY(-6px); }
        .table-row { transition: all 0.2s ease; }
        .table-row:hover { background-color: rgba(34, 197, 94, 0.05); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
            🎛️ Admin Dashboard
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            स्वागत है, <span className="text-green-400 font-semibold">{user?.fullName || "Admin"}</span>! 👋
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          
          {/* Total Users Card */}
          <div className="card-animate group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-blue-500/20 p-6 sm:p-7 lg:p-8 overflow-hidden stats-card">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                  कुल उपयोगकर्ता
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4">
                  {allUsers.length}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">सभी पंजीकृत उपयोगकर्ता</p>
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full border border-blue-500/30 backdrop-blur">
                <Users className="text-blue-400" size={32} />
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className="card-animate group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-green-500/20 p-6 sm:p-7 lg:p-8 overflow-hidden stats-card">
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                  सक्रिय उपयोगकर्ता
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4">
                  {activeUsers}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">पिछले 30 दिनों में</p>
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full border border-green-500/30 backdrop-blur">
                <UserCheck className="text-green-400" size={32} />
              </div>
            </div>
          </div>

          {/* Total Products Card */}
          <div className="card-animate group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-purple-500/20 p-6 sm:p-7 lg:p-8 overflow-hidden stats-card sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                  कुल उत्पाद
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4">
                  {totalProducts}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">सूची में उत्पाद</p>
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur">
                <Package className="text-purple-400" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="card-animate bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl border border-green-500/20 overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 border-b border-green-500/20 bg-slate-900/50 backdrop-blur">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                👥 उपयोगकर्ता सूची
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="नाम या ईमेल से खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 sm:py-3 bg-slate-700/50 border border-green-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition w-full sm:w-64 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Table - Desktop View */}
          <div className="hidden md:block overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead className="bg-slate-900/80 border-b border-green-500/20">
                <tr>
                  <th className="px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">
                    नाम
                  </th>
                  <th className="px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">
                    ईमेल
                  </th>
                  <th className="px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">
                    पता
                  </th>
                  <th className="px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">
                    भूमिका
                  </th>
                  <th className="px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">
                    शामिल तारीख
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-500/10">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u._id} className="table-row hover:bg-green-500/5">
                      <td className="px-6 lg:px-8 py-4 text-sm text-white font-semibold">
                        {u.fullName}
                      </td>
                      <td className="px-6 lg:px-8 py-4 text-sm text-gray-400">
                        {u.email}
                      </td>
                      <td className="px-6 lg:px-8 py-4 text-sm text-gray-400 max-w-xs truncate">
                        {u.address}
                      </td>
                      <td className="px-6 lg:px-8 py-4 text-sm">
                        {u.role === "admin" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full text-xs font-bold">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                            ADMIN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold">
                            <span className="w-2 h-2 bg-blue-400 rounded-full" />
                            USER
                          </span>
                        )}
                      </td>
                      <td className="px-6 lg:px-8 py-4 text-sm text-gray-400 flex items-center gap-2">
                        <Calendar size={16} className="text-green-400/60" />
                        {new Date(u.createdAt).toLocaleDateString("hi-IN")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 lg:px-8 py-12 text-center text-gray-500">
                      कोई उपयोगकर्ता नहीं मिला
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card View - Mobile & Tablet */}
          <div className="md:hidden p-4 sm:p-6 space-y-3 sm:space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, index) => (
                <div 
                  key={u._id} 
                  className="bg-slate-700/30 backdrop-blur border border-green-500/20 rounded-lg p-4 sm:p-5 hover:border-green-500/40 transition group"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Name */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">नाम</p>
                      <p className="text-base sm:text-lg font-bold text-white mt-1">{u.fullName}</p>
                    </div>

                    {/* Email */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">ईमेल</p>
                      <p className="text-xs sm:text-sm text-gray-400 break-all mt-1">{u.email}</p>
                    </div>

                    {/* Address */}
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">पता</p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">{u.address}</p>
                    </div>

                    {/* Role & Date */}
                    <div className="flex items-center justify-between pt-3 border-t border-green-500/10">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">भूमिका</p>
                        {u.role === "admin" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full text-xs font-bold mt-2">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                            ADMIN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold mt-2">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                            USER
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">शामिल</p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">
                          {new Date(u.createdAt).toLocaleDateString("hi-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">कोई उपयोगकर्ता नहीं मिला</p>
            )}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-green-500/20 rounded-lg sm:rounded-xl backdrop-blur">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-gray-400 text-sm">
                <span className="text-green-400 font-bold">{filteredUsers.length}</span> उपयोगकर्ता दिखा रहे हैं (कुल से <span className="text-green-400 font-bold">{allUsers.length}</span>)
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <TrendingUp size={18} className="text-green-400" />
              <span>
                <span className="text-green-400 font-bold">{Math.round((activeUsers / allUsers.length) * 100) || 0}%</span> सक्रिय दर
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}