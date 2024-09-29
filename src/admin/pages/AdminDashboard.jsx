import { useState, useContext, useEffect } from "react"
import DataTable from "react-data-table-component"
import { AuthAdminContext } from "../hooks/useAuth"
import { Verified } from "@mui/icons-material";

export default function AdminDashboard() {
    const { token } = useContext(AuthAdminContext);
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            let res = await fetch("http://localhost:5000/api/admin/user_info", {
                headers: {
                    'x-access-token': token
                }
            });
            let json = await res.json();
            let rows = await json.map(user => {
                return {
                    userId: user.userId,
                    username: user.username,
                    email: user.email,
                    verified: user.verified ? 'verdadero' : 'falso'
                }
            })
            setRows(rows)
            setLoading(false)
        }

        getUsers()
    }, [])

    return (
        <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100vh'}}>
            Dashboard admin
            <div className="table" style={{width: '60%'}}>
                <DataTable 
                columns={columns}
                data={rows}
                progressPending={loading}
                pagination
                paginationPerPage={5}
                style={customStyles}
                />
            </div>
        </div>
    )
}

// userId, username, email, password, userType, name, surname, birthdate, verified
const columns = [
    {
        name: "ID Usuario",
        selector: row => row.userId,
        width: '180px'
    },
    {
        name: "Nombre de usuario",
        selector: row => row.username,
        width: '180px',
    },
    {
        name: "Email",
        selector: row => row.email,
        width: '180px'
    },
    {
        name: "Verificado",
        selector: row => row.verified,
        width: '180px'
    }
]

// estilos de la tabla

const customStyles = {
    rows: {
        style: {
            width: '500px'
        }
    }
}