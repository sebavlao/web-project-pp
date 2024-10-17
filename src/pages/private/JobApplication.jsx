import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const JobApplication = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    navigate("/cliente");
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 250) {
      setDescription(e.target.value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleForm}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Solicitar Trabajo
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ingrese el trabajo que desea solicitar"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <select
            id="category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccione una categoría</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción (máx. 250 caracteres)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Describa el trabajo solicitado"
            rows="4"
          />
          <p className="text-sm text-gray-500">{description.length}/250</p>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md shadow hover:bg-indigo-700 transition duration-300"
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
};
