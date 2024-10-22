import { useContext, useEffect, useState } from "react"
import variablesCSS from "../../../styles/adminStyles/variablescss";
import endpoints from "../../../data/adminData/api";
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import { ActivityColumns, ActivityUserParseRows } from "./TableData";
import AdminModal from "../../../components/adminComponents/Modals/AdminModal";
import StorageIcon from '@mui/icons-material/Storage';
import BoxStyled from "../../../components/adminComponents/Box";

export default function InfoUser({}) {
    const { token } = useContext(AuthAdminContext);
    const [user, setUser] = useState();
    const [jobs, setJobs] = useState()
    const [loaded, setLoaded] = useState(false);
    const { reload, setReload,  } = useContext(AuthAdminContext)

    useEffect(() => {
        const id = window.location.href.split('/')[6];
        const data = {
            headers: {
                "x-access-token": token
            }
        }
        
        async function getUserInfo() {
            const urls = [endpoints.users + id, endpoints.jobs]
            const fetchPromises = urls.map(endpoint => fetch(endpoint, data));
            Promise.all(fetchPromises)
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(json => {
                setUser(json[0])
                setJobs(filterJobs(json[0].userType, json[1], json[0]._id))
                setLoaded(true)
            })
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
        setReload(!reload)
    }

    return (
        <div style={{overflowY: 'scroll', color: 'whitesmoke', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '.5rem'}}>
            {loaded ? (
                <>
                <div className="container-user" style={{backgroundColor: variablesCSS.secondaryColor, borderRadius: variablesCSS.border1}}>
                    <div>
                    <div style={{backgroundColor: variablesCSS.mainColor, padding: '.5rem', width: 'auto', alignSelf: 'flex-start', borderRadius: variablesCSS.border2}}>
                        <h1 style={{textAlign: 'flex-start', fontSize: '1rem', fontWeight: '500'}}>{user.username}</h1>
                        <hr />
                        <p>{user.name} {user.surname}</p>
                        <AdminModal logo={<StorageIcon sx={{color: 'white'}}/>}><ModalLogs endpoint={endpoints.users + user._id + '/activity'} /></AdminModal>
                    </div>
                    { !user.isActive ? (<button onClick={reactiveuser} style={{backgroundColor: variablesCSS.loginVioletColor, borderRadius: variablesCSS.border2, padding: '.2rem', marginTop: '.5rem'}}>Reactivar usuario</button>) : ("") } 
                    </div>
                    <div style={{backgroundColor: variablesCSS.mainColor, marginLeft: '.5rem', padding: '.5rem', borderRadius: variablesCSS.border2, alignSelf: 'flex-start'}}>
                        <h2 style={{fontWeight: '500'}}>Información del perfil</h2>
                        <hr />
                        <div className="info" style={{fontSize: '.8rem', marginTop: '.5rem', padding: '.5rem'}}>
                            <p>Nombre: {user.name}</p>
                            <p>Apellido: {user.surname}</p>
                            <p>Email: {user.email}</p>
                            <p>Tipo de usuario: {user.userType}</p>
                            <p>Fecha de nacimiento: {user.birthdate}</p>
                            <p>Estado: {user.verified ? 'Verificado' : 'No verificado'}</p>
                        </div>
                    </div>
                    <div style={{backgroundColor: variablesCSS.mainColor, flexGrow: '1', marginLeft: '.5rem', borderRadius: variablesCSS.border2, padding: '.5rem'}}>
                        <h2 style={{fontWeight: '500'}}>{user.userType === "client" ? "Trabajos publicados" : "Trabajos aplicados"}</h2>
                        <hr />
                        <div className="section-jobs" style={{marginTop: '.5rem', padding: '.5rem'}}>
                            {jobs.map(el => {
                                return <JobPost title={el.title} description={el.description} id={el._id} key={el._id}></JobPost>
                            })}
                        </div>
                    </div>
                </div>
                    <div className="logs" style={{width: '90%'}}>
                        
                    </div>
                </>
            ) : <p>Cargando...</p>}
        </div>
    )
}

function filterJobs(userType, jobs, id) {
    if (userType === "client") {
        return jobs.filter(el => el.userId._id === id)
    }

    if (userType === "worker") {
        let workerJobs = [];
        jobs.forEach(job => {
            job.applicantsId.forEach(applicant => {
                (applicant === id) ? workerJobs.push(job) : ""
            })
        })
        return workerJobs
    }
}


function JobPost({title, description, id}) {

    return (
        <div style={{fontSize: '.8rem'}}>
            <p>{title}</p>
            <p><i>ID |</i> <b>{id}</b></p>
            <p>{description}</p>
            <hr />
            <br />
        </div>
    )
}

function ModalLogs({endpoint}) {

    return (
        <BoxStyled>
            <TableDataComponentized endpoint={endpoint} columns={ActivityColumns} parseRows={ActivityUserParseRows} scroll={true} inputText={'Buscar por IP o URL'}></TableDataComponentized>
        </BoxStyled>
    )
}

