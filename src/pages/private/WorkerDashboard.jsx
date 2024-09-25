import React, { useContext } from 'react';
import { WContext } from '../../context/WorkContext';
import WorkList from '../../components/WorkList';
// El dashboard trabajador debe ser una ruta privada, agregar logica via auth context !

const WorkerDashboard = () => {
  const { trabajos } = useContext(WContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Lista de Trabajos</h1>
      <div className="w-full max-w-4xl">
        <WorkList trabajos={trabajos} />
      </div>
    </div>
  );
};

export default WorkerDashboard;


