/* Hook para hacer un get a los trabajos disponibles*/
import React, {useState, useEffect } from 'react';
import { useAccessToken } from './useAccessToken';

  export const useGetWorks = () => {
    const [works, setWorks] = useState([]);
    const { getToken } = useAccessToken();
    const token = getToken();

  
    useEffect(() => {
      localStorage.setItem('x-access-token', token)
      const fetchTrabajos = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/jobs' ,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
            },
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          // console.log('Success:', data); muestra los datos 
          setWorks(data); // Establece los trabajos recibidos
        } catch (err) {
          console.error('Error fetching jobs:', err);
        }
      };
  
      if (token) { // Solo ejecuta fetchTrabajos si hay un token
        fetchTrabajos();
      }
    }, [token]); // Añade token como dependencia

    return { works};
  };
