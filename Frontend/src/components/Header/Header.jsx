import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      closeMenu();
    }
  };

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 py-3">
          
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img
              src="https://res.cloudinary.com/decqt0izm/image/upload/v1766206433/logo4_tyuruo.png"
              className="h-12 w-24 sm:h-16 sm:w-32"
              alt="Logo"
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Menu */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute lg:relative top-full left-0 right-0 lg:top-auto w-full lg:w-auto lg:flex lg:order-1 bg-white lg:bg-transparent border-b lg:border-b-0 border-gray-200`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 font-medium w-full lg:w-auto">
              {["/", "/about", "/contact"].map((path, i) => (
                <li key={i} className="w-full lg:w-auto border-b lg:border-b-0 border-gray-100">
                  <NavLink
                    to={path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-3 px-4 sm:px-3 ${
                        isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                      } hover:text-orange-700 hover:bg-orange-50 lg:hover:bg-transparent transition-colors`
                    }
                  >
                    {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                  </NavLink>
                </li>
              ))}

              {user?.role === "admin" && (
                <li className="w-full lg:w-auto border-b lg:border-b-0 border-gray-100">
                  <NavLink
                    to="/admin/posts"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-3 px-4 sm:px-3 ${
                        isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                      } hover:text-orange-700 hover:bg-orange-50 lg:hover:bg-transparent transition-colors`
                    }
                  >
                    Admin Panel
                  </NavLink>
                </li>
              )}
              {user?.role === "admin" && (
                <li className="w-full lg:w-auto border-b lg:border-b-0 border-gray-100">
                  <NavLink
                    to="/admin/dashboard"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-3 px-4 sm:px-3 ${
                        isActive ? "text-orange-700 bg-orange-50 lg:bg-transparent" : "text-gray-700"
                      } hover:text-orange-700 hover:bg-orange-50 lg:hover:bg-transparent transition-colors`
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}

              {/* Mobile Auth Section */}
              <li className="lg:hidden w-full border-t border-gray-200 mt-2 pt-2">
                {user ? (
                  <div className="px-4 py-3">
                    <p className="text-gray-700 mb-3 font-medium">Hello, {user.fullName || user.name}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 px-4 py-3">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-center"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="px-4 py-2 text-sm text-white bg-orange-700 hover:bg-orange-800 rounded-lg transition-colors text-center"
                    >
                      Get started
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center lg:order-2 gap-2">
            {user ? (
              <>
                <span className="mr-2 text-sm text-gray-700">Hello, {user.fullName || user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm text-white bg-orange-700 hover:bg-orange-800 rounded-lg transition-colors"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}