import { Outlet } from "react-router-dom"
import Header from "./Header"
import SideBar from "./SideBar"
import { useState, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth"
import variablesCSS from "../../../styles/adminStyles/variablescss"
import endpoints from "../../../data/adminData/api"

export default function AdminLayout() {
    const { token } = useContext(AuthAdminContext);
    const [viewsAdmin, setViewsAdmin] = useState(<div style={ {height: '100vh', backgroundColor: variablesCSS.mainColor} }><p style={{color: 'white'}}>Cargando...</p></div>);

    useEffect(() => {
        const getAuth = async () => {
            let res = await fetch(endpoints.usersInfo, {
                headers: {
                    "x-access-token": token
                }
            });

            let status = res.status;

            if (status === 200) {
                setViewsAdmin(<ViewAdminAuth></ViewAdminAuth>)
            } else {
                setViewsAdmin(<Navigate to={'/auth/admin-login'}></Navigate>)
            }
        };

        getAuth();
    }, [])

    return viewsAdmin
}

function ViewAdminAuth() {
    return (
        <div>
            <Header></Header>
            <div style={{display: 'flex', backgroundColor: variablesCSS.mainColor}}>
                <SideBar></SideBar>
                <Outlet></Outlet>
            </div>
        </div>
    )
}