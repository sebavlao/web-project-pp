import { useContext, useEffect, useState } from "react"
import { AuthAdminContext } from "../hooks/useAuth";
import variablesCSS from "../styles/variablescss";

export default function InfoUser({}) {
    const { token } = useContext(AuthAdminContext);
    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const id = window.location.href.split('/')[5];
        
        async function getUserInfo() {
            const res = await fetch("http://localhost:5000/api/admin/users/" + id, {
                headers: {
                    "x-access-token": token
                }
            });
            const json = await res.json();
            setUser(json);
            setLoaded(true);
        }

        getUserInfo()
    }, [])

    if (loaded) return (
        <div style={{height: '100vh', color: 'whitesmoke', width: '60%', margin: 'auto'}}>
            <div className="container-user" style={{backgroundColor: variablesCSS.secondaryColor, padding: '1rem', paddingTop: 0, borderRadius: '.3rem'}}>
                <h1 style={{textAlign: 'center', marginTop: '1rem'}}>{user.username}</h1>
                <p>Nombre: {user.name}</p>
                <p>Apellido: {user.surname}</p>
                <p>Email: {user.email}</p>
                <p>Tipo de usuario: {user.userType}</p>
                <p>Fecha de nacimiento: {user.birthdate}</p>
                <p>Estado: {user.verified ? 'Verificado' : 'No verificado'}</p>
            </div>
        </div>
    )
}