import { NavLink } from 'react-router-dom';

export const Home = () => (
  
  <main className="min-h-screen flex flex-col justify-center items-center py-6 px-4">
    <img 
      src="/admin/worklink-logo-colored.png" 
      alt="Logo de la Compañía" 
      className="h-40 mb-4" // Tamaño del logo y margen inferior
    />
    <h1 className="text-white font-bold text-center text-4xl mb-6 py-6">
      Bienvenidos a la próxima aplicación para solicitar trabajo
    </h1>
    <div className="flex space-x-4">
  <NavLink 
    to="/login"
    className="bg-white text-black font-bold py-4 px-4 rounded"
  >
    Login
  </NavLink>
  <NavLink 
    to="/registro-cliente"
    className="bg-white text-black font-bold py-4 px-10 rounded"
  >
    Registro Cliente
  </NavLink>
  <NavLink 
    to="/registro-trabajador"
    className="bg-white text-black font-bold py-4 px-10 rounded"
  >
    Registro Trabajador
  </NavLink>
</div>
   
  </main>
);
