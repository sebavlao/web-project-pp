import React from 'react';
import WorkCard from './WorkCard';


const WorkList = ({ works }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {Array.isArray(works.jobs) && works.jobs.length > 0 ? (
        works.jobs.map((work) => (
          <WorkCard
            key={work.id}
            id={work.id}
            titulo={work.title}
            descripcion={work.description}
            // imagen={work.image} Activar cuando la api tenga para testear imagen y categoria 
            // categoria={work.category}
            
          />
        ))
      ) : (
        <p>No hay trabajos disponibles</p>
      )}
    </div>
  );
};

export default WorkList;
