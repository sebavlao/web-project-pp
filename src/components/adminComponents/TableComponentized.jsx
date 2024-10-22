import { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AuthAdminContext } from "../../hooks/adminHooks/useAuth";
import variablesCSS from "../../styles/adminStyles/variablescss";
import { TextField } from "@mui/material";
import endpoints from "../../data/adminData/api";
import SearchIcon from '@mui/icons-material/Search';

export default function TableDataComponentized({ endpoint, columns, parseRows, inputText, scroll, selectJobs = false }) {
    const { token, reload } = useContext(AuthAdminContext);
    const [originalData, setOriginalData] = useState();
    const [rows, setRows] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            let res = await fetch(endpoint, {
                headers: {
                    'x-access-token': token
                }
            });
            let json = await res.json();
            let rows = parseRows(json);
            setOriginalData(rows)
            setRows(rows)
            setLoading(false)
        }

        getData()
    }, [reload])

    const findUser = (e) => {
        if (endpoint === endpoints.usersInfo) {
            let updatedRows = originalData.filter(el => {
                return el.nameuser.toLowerCase().includes(e.target.value.toLowerCase()) || el.email.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setRows(updatedRows)
        }
        
        if (endpoint === endpoints.admins) {
            let updatedRows = originalData.filter(el => {
                return el.nameuser.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setRows(updatedRows)
        }

        if (endpoint === endpoints.jobs) {
            let updatedRows = originalData.filter(el => {
                return el.title.toLowerCase().includes(e.target.value.toLowerCase()) || el.id.toLowerCase().includes(e.target.value.toLowerCase()) || el.autor.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setRows(updatedRows)
        }  

        if (endpoint === endpoints.logs) {
            let updatedRows = originalData.filter(el => {
                return el.id.toLowerCase().includes(e.target.value.toLowerCase()) || el.ip.toLowerCase().includes(e.target.value.toLowerCase())
            })
            setRows(updatedRows)
        }

        if (endpoint === endpoints.jobsCategories) {
            let updatedRows = originalData.filter(el => {
                return el.id.toLowerCase().includes(e.target.value.toLowerCase()) || el.name.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setRows(updatedRows)
        }

        if (endpoint.includes('activity')) {
            let updatedRows = originalData.filter(el => {
                return el.ip.toLowerCase().includes(e.target.value.toLowerCase()) || el.url.toLowerCase().includes(e.target.value.toLowerCase());
            })
            setRows(updatedRows)
        }
    }

    const selectByState = (e) => {
        if (e.target.value === "todos") {
            setRows(originalData)
            return
        }

        let updatedRows = originalData.filter(el => {
            return el.state.toLowerCase() === e.target.value
        })
        setRows(updatedRows)
    }

    const filterJobs = !selectJobs ? "" : <select name="selectCategory" onChange={selectByState}><option value="todos">Todos</option><option value="activo">Activo</option><option value="pendiente">Pendiente</option><option value="finalizado">Finalizado</option></select>

    const scrollActive = !scroll ? {backgroundColor: variablesCSS.mainColor, width: '100%', minHeight: '100%', maxHeight: '100%'} : {backgroundColor: variablesCSS.mainColor, width: '100%', minHeight: '100%', maxHeight: '100%', overflowX: 'scroll'}

    return (
        <div style={scrollActive}>
            <div className="container-seach" style={{width: '80%', margin: 'auto', marginTop: '1rem', display: 'flex', flexDirection: 'row' }}>
                <TextField
                    id="standard-search"
                    label={inputText}
                    type="search"
                    variant="standard"
                    onChange={findUser}
                    sx={{color: 'white', borderBottom: 'thin solid grey', marginBottom: '.5rem', width: '20%', input: {
                        color: 'whitesmoke',
                        fontSize: '.7rem',
                        "&::placeholder": {
                            color: 'white'
                        }
                    }, label: { color: 'whitesmoke', fontSize: '.8rem' } }}
                    />
                <SearchIcon sx={{color: 'white', alignSelf: 'center', fontSize: '1rem'}}></SearchIcon>
                {filterJobs}
            </div>
            <div className="table" style={{width: '80%', margin: 'auto', backgroundColor: variablesCSS.mainColor, paddingBottom: '2rem', paddingTop: '.5rem'}}>
                <DataTable 
                    columns={columns}
                    data={rows}
                    progressPending={loading}
                    noDataComponent={<div style={{backgroundColor: variablesCSS.mainColor, width: '100%', display: 'flex', justifyContent: 'center'}}><p style={{color: 'whitesmoke', paddingTop: '2rem'}}>Ups! no se encontró información</p></div>}
                    pagination
                    wrap={true}
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

