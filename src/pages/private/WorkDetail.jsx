import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetWorkDetail } from '../../hooks/useGetWorkDetail';
import { useAccessToken } from '../../hooks/useAccessToken';
import endpoints from "../../data/adminData/api";
import './../styles.css';

//Cuando se pueda agregar un loading 
const WorkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decodedId = id ? decodeURIComponent(id) : null; // Decodifica solo si existe id
  const { getToken } = useAccessToken();
  const token = getToken();
  
  const [work, setWork] = useState(null);
  const { work: fetchedWork } = useGetWorkDetail(decodedId);
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    if (fetchedWork) {
      setWork(fetchedWork);
    }
  }, [fetchedWork]);

  if (!work) {
    return <p className="text-center text-gray-500">Cargando detalles...</p>;
  }

  async function applyToJob() {
    let res = await fetch(endpoints.userJobs + "/" + work.id + "/apply", {
      method: "POST",
      headers: {
        "x-access-token": token
      }
    });

    res.status === 200 ? setNotif(<Notif success={true} />) : setNotif(<Notif success={false} />)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-whitesmoke shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{work.title}</h1>
        <p className="text-lg text-gray-600 mb-2">Categoría: {work.category}</p>
        <p className="text-base text-gray-500 mb-6">{work.description}</p>
        
        <button onClick={() => navigate("/trabajador")}
          className="bg-black text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out">
          Volver
        </button>
        { 
          notif ?
          notif :
          <button className='apply-job' onClick={applyToJob}>Aplicar a trabajo</button>
        }
      </div>
    </div>
  );
};

function Notif({success}) {
  const message = success ? <p className='success-apply'>Te postulaste correctamente al trabajo.</p> : <p className='bad-apply'>Error. Ya estás postulado para este trabajo.</p>
  const [notif, setNotif] = useState(message);

  useEffect(() => {
    setTimeout(() => {
      setNotif(false)
    }, 5000);
  }, [])

  return (
    <div>
      { notif && 
        notif
      }
    </div>
  )
}

export default WorkDetail;
