import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full py-4">
      <div className="container mx-auto flex items-center justify-between max-w-5xl">
        <div className="footer-logo">
             {/* Logo */}
          <img src="/admin/worklink-logo-colored.png" alt="Logo de la Compañía" className="h-11 pl-16" />
            {/* Derechos reservados */}
          <p className="text-xs">WorkLink. Todos los derechos reservados.</p>
        </div>

 

        {/* Links */}
        <ul className="flex space-x-4 text-sm">
          <li>
            <NavLink
              to="/contacto"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Contacto
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nosotros"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/terminos"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Términos y Condiciones
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
 