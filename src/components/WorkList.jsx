import React from 'react';
import WorkCard from './WorkCard';


const WorkList = ({ works }) => {
  if (!works) return <h1>No se encontraron trabajos</h1> 
  return (
    <>
    <div className="w-full max-w-4xl mx-auto" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem'}}>
      { 
        works?.map((work) => (
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
