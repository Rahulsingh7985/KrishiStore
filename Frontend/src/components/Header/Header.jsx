import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Menu, X, LogOut, User, Home, Info, Phone, BarChart3, Settings } from "lucide-react";

export default function ModernHeader() {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    if (window.confirm("क्या आप लॉगआउट करना चाहते हैं?")) {
      logout();
      closeMenu();
    }
  };

  const navLinks = [
    { path: "/", label: "🏠 होम" },
    { path: "/about", label: "ℹ️ परिचय" },
    { path: "/contact", label: "📞 संपर्क" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-green-900/95 to-slate-900/95 border-b border-green-500/20 shadow-2xl">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-item { transition: all 0.3s ease; }
        .nav-item:hover { transform: translateY(-2px); }
        .menu-slide { animation: slideDown 0.3s ease-out; }
        .btn-hover { transition: all 0.2s ease; }
        .btn-hover:hover { transform: scale(1.05); }
        .btn-hover:active { transform: scale(0.95); }
      `}</style>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo with Glow Effect */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-slate-900 px-3 py-2 rounded-lg">
                <span className="text-2xl font-bold">🌾</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                अंजलि बीज भंडार
              </h1>
              <p className="text-xs text-gray-400">आपकी कृषि समाधान</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 nav-item ${
                      isActive
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Admin Links */}
            {user?.role === "admin" && (
              <>
                <li className="border-l border-gray-600/30 pl-1">
                  <NavLink
                    to="/admin/posts"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 nav-item ${
                        isActive
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
                      }`
                    }
                  >
                    <BarChart3 size={16} /> पोस्ट
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 nav-item ${
                        isActive
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
                      }`
                    }
                  >
                    <Settings size={16} /> डैशबोर्ड
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <User size={18} className="text-green-400" />
                  <div className="text-right">
                    <p className="text-xs text-gray-400">स्वागत है</p>
                    <p className="text-sm font-semibold text-green-400">
                      {user.fullName || user.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 btn-hover shadow-lg hover:shadow-red-500/50"
                >
                  <LogOut size={18} /> लॉगआउट
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 text-gray-300 hover:text-white font-semibold transition-all duration-300 nav-item"
                >
                  लॉगिन करें
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 btn-hover shadow-lg hover:shadow-green-500/50"
                >
                  शुरुआत करें
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-green-500/10 transition-colors text-green-400"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 menu-slide">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-green-500/20 text-green-400 border-l-2 border-green-400"
                          : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              {/* Mobile Admin Links */}
              {user?.role === "admin" && (
                <>
                  <li className="border-t border-gray-600/30 mt-3 pt-3">
                    <NavLink
                      to="/admin/posts"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-yellow-500/20 text-yellow-400 border-l-2 border-yellow-400"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
                        }`
                      }
                    >
                      <BarChart3 size={18} /> पोस्ट
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/dashboard"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-yellow-500/20 text-yellow-400 border-l-2 border-yellow-400"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10"
                        }`
                      }
                    >
                      <Settings size={18} /> डैशबोर्ड
                    </NavLink>
                  </li>
                </>
              )}

              {/* Mobile Auth Section */}
              <li className="border-t border-gray-600/30 mt-3 pt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-xs text-gray-400 mb-1">स्वागत है</p>
                      <p className="text-sm font-semibold text-green-400">
                        {user.fullName || user.name}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 btn-hover"
                    >
                      <LogOut size={18} /> लॉगआउट
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="block px-4 py-3 text-center text-gray-300 hover:text-white hover:bg-gray-600/20 rounded-lg font-medium transition-all duration-300"
                    >
                      लॉगिन करें
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="block px-4 py-3 text-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 btn-hover"
                    >
                      शुरुआत करें
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}