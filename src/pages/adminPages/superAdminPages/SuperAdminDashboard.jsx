import { useState, useContext, useEffect } from "react"
import endpoints from "../../../data/adminData/api"
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth"
import { Navigate } from "react-router-dom"
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import variablesCSS from "../../../styles/adminStyles/variablescss";
import { SuperAdminColumns, SuperAdminParseRows } from "./TableData";

export default function SuperAdminDashboard() {
    const { token } = useContext(AuthAdminContext);
    const [viewsSuperAdmin, setViewsSuperAdmin] = useState(<div style={ {height: '100vh', backgroundColor: variablesCSS.mainColor} }><p style={{color: 'white'}}>Cargando...</p></div>);

    useEffect(() => {
        const getAdmins = async () => {
            let res = await fetch(endpoints.admins, {
                headers: {
                    'x-access-token': token
                }
            })
            let status = res.status;
            if (status === 200) {
                setViewsSuperAdmin(ViewsSuperAdminAuth);
            } else {
                setViewsSuperAdmin(<Navigate to={'/auth/admin'}></Navigate>);
            }
        }

        getAdmins()
    }, [])

    return viewsSuperAdmin
}

function ViewsSuperAdminAuth() {
    
    return (
        <TableDataComponentized endpoint={endpoints.admins} columns={SuperAdminColumns} parseRows={SuperAdminParseRows} inputText={"Buscar por username"}></TableDataComponentized>
    )
}