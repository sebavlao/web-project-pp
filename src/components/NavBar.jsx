import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, username }) => {
  return (
    <nav className="bg-gray-800 w-full h-15 fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          WorkLink
        </Link>

        {/* Botones con direccion a otra pagina(Pestanias) */}
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Inicio
          </Link>
         
        </div>

        {/* Botón de usuario */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-300">Hola, {username}</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => console.log('Logout')}
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

export default Navbar;
