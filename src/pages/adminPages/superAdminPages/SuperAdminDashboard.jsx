import { useState, useContext, useEffect } from "react"
import endpoints from "../../../data/adminData/api"
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth"
import { Navigate } from "react-router-dom"
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import variablesCSS from "../../../styles/adminStyles/variablescss";
import { SuperAdminColumns, SuperAdminParseRows } from "./TableData";
import AdminModal from "../../../components/adminComponents/Modals/AdminModal";
import FormCreate from "../../../components/adminComponents/Forms/CreateRegister";

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
                setViewsSuperAdmin(<ViewsSuperAdminAuth token={token}></ViewsSuperAdminAuth>);
            } else {
                setViewsSuperAdmin(<Navigate to={'/auth/admin'}></Navigate>);
            }
        }

        getAdmins()
    }, [])

    return viewsSuperAdmin
}

function ViewsSuperAdminAuth({token}) {

    return (
        <div style={{height: 'auto', width: '100%', overflowY: 'scroll'}}>
            <AdminModal logo={'create admin'}><FormCreate endpoint={endpoints.registerAdmins} token={token} properties={['username', 'password']}></FormCreate></AdminModal>
            <TableDataComponentized endpoint={endpoints.admins} columns={SuperAdminColumns} parseRows={SuperAdminParseRows} inputText={"Buscar por username"} />
        </div>
    )
}