import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Users, Package, UserCheck, AlertCircle } from "lucide-react";
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
        
        // Count active users (you can define active as users created in last 30 days)
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // -------------------------
  // Error State
  // -------------------------
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-600 mb-4" size={48} />
          <p className="text-2xl font-bold text-gray-800 mb-2">{error}</p>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back, {user?.fullName || "Admin"}! 👋
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Total Users Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Total Users
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {allUsers.length}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="text-blue-600" size={32} />
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Active Users (30 days)
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {activeUsers}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <UserCheck className="text-green-600" size={32} />
              </div>
            </div>
          </div>

          {/* Total Products Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                  Total Products
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {totalProducts}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <Package className="text-purple-600" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Users List</h2>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
              />
            </div>
          </div>

          {/* Table - Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {u.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {u.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {u.address}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-600">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card View - Mobile */}
          <div className="md:hidden p-4 space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <div key={u._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">Name</p>
                      <p className="text-lg font-bold text-gray-900">{u.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">Email</p>
                      <p className="text-sm text-gray-700 break-all">{u.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-semibold">Address</p>
                      <p className="text-sm text-gray-700">{u.address}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 uppercase font-semibold">Role</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                            u.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {u.role.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 uppercase font-semibold">Joined</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">No users found</p>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>Showing {filteredUsers.length} of {allUsers.length} users</p>
        </div>
      </div>
    </div>
  );
}