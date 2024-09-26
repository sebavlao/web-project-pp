import React from 'react';
import WorkCard from './WorkCard';


const WorkList = ({ works }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {works.map((work, index) => (
        <WorkCard
          key={index}
          titulo={work.titulo}
          imagen={work.imagen}
          categoria={work.categoria}
          descripcion={work.descripcion}
        />
      ))}
    </div>
  );
};

export default WorkList;