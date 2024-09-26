import React from 'react';


const WorkCard = ({ titulo, imagen, categoria, descripcion }) => {
  return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <img src={imagen} alt={titulo} className="w-full h-48 object-cover rounded-t-lg" />
        <h2 className="text-xl font-semibold mt-2">{titulo}</h2>
        <p className="text-gray-600">{categoria}</p>
        <p className="text-gray-500">{descripcion}</p>
      </div>
    );
};

export default WorkCard;