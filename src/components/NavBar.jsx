import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth"

const NavBar = () => {
  const { logout, auth } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="w-full max-w-5xl">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          WorkLink
        </Link>

        {/* Botón de usuario */}
        <div>
          {auth ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-300">Hola, usuario</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
