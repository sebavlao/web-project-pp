/* Hook para hacer un get a los trabajos disponibles*/
import {useState, useEffect, useContext } from 'react';
import { useAccessToken } from './useAccessToken';
import endpoints from "../data/adminData/api"
import { ClientContext } from '../context/ClientContext';

  export const useGetWorks = () => {
    const [works, setWorks] = useState([]);
    const { getToken } = useAccessToken();
    const token = getToken();
    let { offset, category } = useContext(ClientContext);
  
    useEffect(() => {
      localStorage.setItem('x-access-token', token)
      const fetchTrabajos = async () => {
        try {
          const response = await fetch(endpoints.userJobs + '?limit=10000', {
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
    }, [token, offset, category]); // Añade token como dependencia

    return { works};
  };
