/* Hook para hacer un get a los trabajos disponibles*/
import React, { createContext, useState, useEffect } from 'react';

/* Mock para simular api*/
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


export const useGetWorks = () => {
    const [works, setWorks] = useState([]);
 

  useEffect(() => {
    // Simulación de la llamada a la API con datos de prueba
    const fetchWorks = async () => {
      try {
      
        setWorks(trabajosMock); // Usar datos ficticios (mock) para pruebas
       
      } catch (err) {
    
      }
    };

    fetchWorks();
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

  return {works}
};

