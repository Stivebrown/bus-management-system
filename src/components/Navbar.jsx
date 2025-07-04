import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "User" });
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true" || localStorage.getItem("isAdmin") === "true");
    // Simulate fetching user info from localStorage or API
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token"); // Remove token on logout
    alert("Logged out!");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className={`bg-white dark:bg-gray-900 shadow-md py-4 px-8 flex justify-between items-center relative`}>
      <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">Buea Bus & Shipping</div>
      {/* Desktop menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium">Home</Link>
        <Link to="/book" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium">Book Bus</Link>
        <Link to="/ship" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium">Ship Goods</Link>
        {isAdmin ? (
          <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium">Admin</Link>
        ) : null}
        {!isAuthenticated && !isAdmin ? (
          <Link to="/login" className="ml-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">Login</Link>
        ) : null}
        {isAuthenticated && !isAdmin ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="ml-4 flex items-center space-x-2 focus:outline-none"
            >
              <span className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">
                {user.name[0]}
              </span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{user.name.split(" ")[0]}</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded shadow z-20">
                <Link to="/profile" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : null}
        {isAdmin && (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
        <button
          onClick={() => setDarkMode((v) => !v)}
          className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      {/* Hamburger icon for mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-blue-700 mb-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-700 mb-1 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-700 transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-10 flex flex-col items-center py-4 space-y-4 animate-fade-in">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/book" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>Book Bus</Link>
          <Link to="/ship" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>Ship Goods</Link>
          {isAdmin ? (
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>Admin</Link>
          ) : null}
          {!isAuthenticated && !isAdmin ? (
            <Link to="/login" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800" onClick={() => setMenuOpen(false)}>Login</Link>
          ) : null}
          {isAuthenticated && !isAdmin ? (
            <div className="flex flex-col items-center w-full">
              <Link to="/profile" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 w-full text-center" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-red-600"
              >
                Logout
              </button>
            </div>
          ) : null}
          {isAdmin && (
            <button
              onClick={() => { setMenuOpen(false); handleLogout(); }}
              className="w-full text-left px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
