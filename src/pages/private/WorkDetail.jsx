import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetWorkDetail } from '../../hooks/useGetWorkDetail';
import { useAccessToken } from '../../hooks/useAccessToken';

const WorkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decodedId = id ? decodeURIComponent(id) : null; // Decodifica solo si existe id
  const { getToken } = useAccessToken();
  const token = getToken();
  
  const [work, setWork] = useState(null);
  const { work: fetchedWork } = useGetWorkDetail(decodedId);

  useEffect(() => {
    if (fetchedWork) {
      setWork(fetchedWork);
    }
  }, [fetchedWork]);

  if (!work) {
    return <p className="text-center text-gray-500">Cargando detalles...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{work.title}</h1>
        <p className="text-lg text-gray-600 mb-2">Categoría: {work.category}</p>
        <p className="text-base text-gray-500 mb-6">{work.description}</p>
        
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default WorkDetail;
