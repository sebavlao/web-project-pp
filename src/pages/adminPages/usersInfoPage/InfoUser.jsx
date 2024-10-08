import { useContext, useEffect, useState } from "react"
import variablesCSS from "../../../styles/adminStyles/variablescss";
import endpoints from "../../../data/adminData/api";
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";

export default function InfoUser({}) {
    const { token } = useContext(AuthAdminContext);
    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const id = window.location.href.split('/')[5];
        
        async function getUserInfo() {
            const res = await fetch(endpoints.users + id, {
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

    async function reactiveuser() {
        let res = await fetch(endpoints.users + user._id + '/reactivate', {
            method: 'PATCH',
            headers: {
                'x-access-token': token
            }
        })
        let json = await res.json();
        window.location.reload();
    }

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
                { !user.isActive ? (<button onClick={reactiveuser} style={{backgroundColor: 'red', border: 'medium solid white', borderRadius: '.5rem', padding: '.2rem'}}>Reactivar Usuario</button>) : ("") } 
            </div>
        </div>
    )
}