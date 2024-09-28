import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./SideBar"
import { useState, useContext, useEffect } from "react"
import { AuthAdminContext } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

export default function AdminLayout() {
    const { token } = useContext(AuthAdminContext);
    const [viewsAdmin, setViewsAdmin] = useState(<div style={ {height: '100vh', backgroundColor: 'white'} }><p>Cargando...</p></div>)

    useEffect(() => {
        const getAuth = async () => {
            let res = await fetch('http://localhost:5000/api/admin/user_info', {
                headers: {
                    "x-access-token": token
                }
            });

            let status = res.status;

            if (status === 200) {
                setViewsAdmin(<ViewAdminAuth></ViewAdminAuth>)
            } else {
                setViewsAdmin(<Navigate to={'/admin-login'}></Navigate>)
            }
        };

        getAuth();
    }, [])

    return viewsAdmin
}

function ViewAdminAuth() {
    return (
        <div style={{backgroundColor: 'lightblue'}}>
            <button>Prueba de que comparte</button>
            <Header></Header>
            <SideBar></SideBar>
            <Outlet></Outlet>
        </div>
    )
}