import React from 'react';
import WorkCard from './WorkCard';


const ListaDeTrabajos = ({ trabajos }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {trabajos.map((trabajo, index) => (
        <WorkCard
          key={index}
          titulo={trabajo.titulo}
          imagen={trabajo.imagen}
          categoria={trabajo.categoria}
          descripcion={trabajo.descripcion}
        />
      ))}
    </div>
  );
};

export default ListaDeTrabajos;