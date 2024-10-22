import React, { useEffect, useState } from 'react'; 
import WorkList from '../../components/WorkList';
import { useGetWorks } from '../../hooks/useGetWorks';
import { useAccessToken } from '../../hooks/useAccessToken';

// El dashboard trabajador debe ser una ruta privada, agregar lógica via auth context.

export const WorkerDashboard = () => {
  const { getToken, getUser } = useAccessToken();
  const token = getToken();
  const user = getUser();
  const [works, setWorks] = useState([]);
  
  const { works: fetchedWorks } = useGetWorks(); // Obtienes la lista de trabajos
  
  // Maneja el estado cuando los trabajos se hayan cargado
  useEffect(() => {
    if (fetchedWorks) {
      setWorks(fetchedWorks);
    }
  }, [fetchedWorks]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-full max-w-4xl pt-20">
        {/* Se utiliza el estado works */}
        <WorkList works={works} />
      </div>
    </div>

  );
};



