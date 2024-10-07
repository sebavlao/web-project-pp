import { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AuthAdminContext } from "../../hooks/adminHooks/useAuth";
import variablesCSS from "../../styles/adminStyles/variablescss";
import { TextField } from "@mui/material";
import endpoints from "../../data/adminData/api";
import ActionsButtons from "../../components/adminComponents/ActionsButtons";

export default function AdminDashboard() {
    const { token } = useContext(AuthAdminContext);
    const [originalData, setOriginalData] = useState();
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            let res = await fetch(endpoints.usersInfo, {
                headers: {
                    'x-access-token': token
                }
            });
            let json = await res.json();
            let rows = await json.map(user => {
                return {
                    username: <a href={"/admin/user/" + user._id}>{user.username}</a>,
                    nameuser: user.username,
                    email: user.email,
                    verified: user.verified ? '✅' : '❌',
                    type: user.userType,
                    isActive: user.isActive ? 'activo' : 'baneado',
                    actions: <ActionsButtons type={'user'} id={user._id}></ActionsButtons>
                }
            })
            setOriginalData(rows)
            setRows(rows)
            setLoading(false)
        }

        getUsers()
    }, [])

    const findUser = (e) => {
        let updatedRows = originalData.filter(el => {
            return el.nameuser.includes(e.target.value.toLowerCase()) || el.email.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRows(updatedRows)
    }

    // userId, username, email, password, userType, name, surname, birthdate, verified
const columns = [
    {
        name: "Nombre de usuario",
        selector: row => row.username,
        width: '10%',
    },
    {
        name: "Email",
        selector: row => row.email,
        width: '25%'
    },
    {
        name: 'Tipo',
        selector: row => row.type,
        sortable: true,
        width: '10%'
    },
    {
        name: 'Verificado',
        sortable: true,
        selector: row => row.verified,
        width: '15%'
    },
    {
        name: 'Activo',
        sortable: true,
        selector: row => row.isActive,
        width: '15%'
    },
    {
        name: 'Acciones',
        sortable: true,
        selector: row => row.actions,
        width: '25%'
    }
]


    return (
        <div style={{backgroundColor: variablesCSS.mainColor, width: '100%', minHeight: '100vh', maxHeight: '100%'}}>
            <div className="container-seach" style={{width: '60%', margin: 'auto', marginTop: '1rem', display: 'flex'}}>
                <TextField
                    id="standard-search"
                    label="Buscar por usuario o email"
                    type="search"
                    variant="standard"
                    onChange={findUser}
                    sx={{color: 'white', borderBottom: 'thin solid grey', input: {
                        color: 'whitesmoke',
                        fontSize: '.8rem',
                        "&::placeholder": {
                            color: 'white'
                        }
                    }, label: { color: 'whitesmoke', fontSize: '.8rem' } }}
                />
            </div>
            <div className="table" style={{width: '60%', margin: 'auto', backgroundColor: variablesCSS.mainColor, paddingBottom: '2rem', paddingTop: '.5rem'}}>
                <DataTable 
                    columns={columns}
                    data={rows}
                    progressPending={loading}
                    noDataComponent={<div style={{backgroundColor: variablesCSS.mainColor, width: '100%', display: 'flex', justifyContent: 'center'}}><p style={{color: 'whitesmoke', paddingTop: '2rem'}}>Ups! no hay usuarios con ese nombre o email...</p></div>}
                    pagination
                    paginationPerPage={5}
                    customStyles={customStyles}
                />
            </div>
        </div>
    )
}


// estilos de la tabla

const customStyles = {
    rows: {
        style: {
            backgroundColor: variablesCSS.formColor,
            color: variablesCSS.fontColor
        }
    },
    headRow: {
        style: {
            backgroundColor: variablesCSS.mainColor,
            color: variablesCSS.fontColor
        }
    },
    pagination: {
        style: {
            backgroundColor: variablesCSS.formColor,
            color: variablesCSS.fontColor
        },
        pageButtonsStyle: {
            backgroundColor: variablesCSS.secondaryColor
        }
    },
    progress: {
        style: {
            backgroundColor: variablesCSS.mainColor,
            color: variablesCSS.fontColor
        }
    }
}

