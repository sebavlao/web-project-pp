
import { useEffect, useState } from "react";
import { API_USER } from "../../api/api"; // obtener los datos del trabajador con la API_USER

export const WorkerUserDetails = () => {
  const [userData, setUserData] = useState(null); // almacena datos del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("x-access-token"); // Recuperar Token
        if (!token) {
          setError("No hay token disponible, inicia sesión primero.");
          setLoading(false);
          return;
        }

        //  petición a la API
        const response = await API_USER.get("/me", {
          headers: { Authorization: `Bearer ${token}` }, // Incluir  token en la cabecera
        });

        setUserData(response.data); // Guarda datos del usurio
        // setUserData({name: "Juan", surname: "Rev", email:"juan@gmail.com"})
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los datos del usuario.");
        setLoading(false);
      }
    };

    fetchUserData(); // Llamamos a la función para obtener los datos del usuario cuando el componente se monte
  }, []);

  if (loading) {
    return <p className="text-white font-bold text-3xl flex justify-center items-center min-h-screen">Cargando...</p>;
  }

  if (error) {
    return <p className="text-white font-bold text-3xl flex justify-center items-center min-h-screen">{error}</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-6 px-4">
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">Bienvenido, {userData?.name}</h1>
        <p><strong>Nombre: </strong>{userData?.name}</p>
        <p><strong>Apellido: </strong>{userData?.surname}</p>
        <p><strong>Email: </strong>{userData?.email}</p>
        {/* Muestra otros detalles si están disponibles */}
      </div>
    </div>
  );
};
