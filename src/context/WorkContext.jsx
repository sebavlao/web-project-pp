import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const WContext = createContext();


// Datos de prueba (mock) para probar mientras se trabaja en el desarrollo
// Falta probar con trabajos de la api 
const trabajosMock = [
  {
    titulo: "Arreglo de canerias",
    imagen: "https://via.placeholder.com/150",
    categoria: "Plomeria",
    descripcion: "Buscamos un plomero.",
  },
  {
    titulo: "Diseno Pintor Mural",
    imagen: "https://via.placeholder.com/150",
    categoria: "Diseño",
    descripcion: "Se requiere un diseñador y pintor.",
  },
  {
    titulo: "Administrador de edificio",
    imagen: "https://via.placeholder.com/150",
    categoria: "Infraestructura",
    descripcion: "Administrar departamentos.",
  },
  {
    titulo: "Administrador de edificio 2",
    imagen: "https://via.placeholder.com/150",
    categoria: "Infraestructura",
    descripcion: "Administrar departamentos.",
  },
  {
    titulo: "Administrador de edificio 3",
    imagen: "https://via.placeholder.com/150",
    categoria: "Infraestructura",
    descripcion: "Administrar departamentos.",
  },
  {
    titulo: "Administrador de edificio 4",
    imagen: "https://via.placeholder.com/150",
    categoria: "Infraestructura",
    descripcion: "Administrar departamentos.",
  },
  {
    titulo: "Administrador de edificio 5",
    imagen: "https://via.placeholder.com/150",
    categoria: "Infraestructura",
    descripcion: "Administrar departamentos.",
  },
];



// Crear el proveedor del contexto
export const WorkProvider = ({ children }) => {
  const [trabajos, setTrabajos] = useState([]);
 

  useEffect(() => {
    // Simulación de la llamada a la API con datos de prueba
    const fetchTrabajos = async () => {
      try {
      
        setTrabajos(trabajosMock); // Usar datos ficticios (mock) para pruebas
       
      } catch (err) {
    
      }
    };

    fetchTrabajos();
  }, []);

  //Probar cuando esten cargados los trabajos 
/*  useEffect(() => {
    // Simulación de la llamada a la API con datos de prueba
    const fetchTrabajos = async () => {
      try {
    
    
        const response = await fetch('http://localhost:5120/api/jobs');
        const data = await response.json();

        setTrabajos(data); 
      } catch (err) {
       
      }
    };

    fetchTrabajos();
  }, []);
*/

  return (
    <WContext.Provider value={{trabajos}}>
      {children}
    </WContext.Provider>
  );
};
