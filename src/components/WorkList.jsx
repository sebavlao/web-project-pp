import React from 'react';
import WorkCard from './WorkCard';


const WorkList = ({ works }) => {
  if (!works.jobs) return <h1>Cargando...</h1> 
  return (
    <>
    <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 border-2  rounded-lg p-4 bg-white shadow-lg">
    Lista de Trabajos
  </h1>
    <div className="w-full max-w-4xl mx-auto">
      { 
        works?.jobs?.map((work) => (
          <WorkCard
            key={work.id}
            id={work.id}
            titulo={work.title}
            descripcion={work.description}
            // imagen={work.image} Activar cuando la api tenga para testear imagen y categoria 
            // categoria={work.category}
            
          />
        ))}
    </div>
    </>
  );
};

export default WorkList;
