/* Hook para hacer un get a los trabajos disponibles*/
import React, {useState, useEffect } from 'react';
import { useAccessToken } from './useAccessToken';

  export const useGetWorkDetail = (jobId) => {
    const [work, setWork] = useState([]);
    const { getToken } = useAccessToken();
    const token = getToken();

  
    useEffect(() => {
      localStorage.setItem('x-access-token', token)
      const fetchTrabajos = async () => {
        try {
          const response = await fetch(`http://localhost:5120/api/jobs/${jobId}` ,{
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
          setWork(data); // Establece los trabajos recibidos
        } catch (err) {
          console.error('Error fetching jobs:', err);
        }
      };
  
      if (token) { // Solo ejecuta fetchTrabajos si hay un token
        fetchTrabajos();
      }
    }, [token]); // Añade token como dependencia

    return { work };
  };
