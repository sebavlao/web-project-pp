import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../context/ClientContext"
import { API_CURRENT_USER, API_JOBS } from "../api/api";
import "./styles.css";
import { useAccessToken } from "../hooks/useAccessToken";
import endpoints from "../data/adminData/api";

export const ClientHome = () => {
  
  return (
        <div className="home-view">
          <div className="user-profile"><ProfileHome /></div>
          <div className="user-jobs"><JobsHome /></div>
          <div className="add-jobs">
            <AddNewJob />
            <ModalJob />
          </div>
        </div>
  )
}

function AddNewJob() {
  return (
    <div className='add-job'> 
      <a href='/cliente/solicitud-trabajo' className='anchor-add-job'>+ | Crear trabajo</a>
    </div>
  )
}

// Profile Section
function ProfileHome() {
  const { updProfile } = useContext(ClientContext);
  const [dataProfile, setDataProfile] = useState(Loading);

  async function updateProfile() {
    const myInfo = await API_CURRENT_USER.get();
    setDataProfile(myInfo.data);
    localStorage.setItem('_id', myInfo.data._id);
  }

  useEffect(() => {
    updateProfile();

  }, [updProfile]);

  if (dataProfile) {
    return (
      <>
        <p className="title">Perfil</p>
        <div className="profile-component">
          <h1>{dataProfile.username}</h1>  
          <hr />
        </div>
        <div className='profile-component'>
          <p>{dataProfile.name} {dataProfile.surname}</p>
          <p>Correo electrónico: {dataProfile.email}</p>
        </div>
      </>
    )
  }
}

// Jobs Section.
function JobsHome() {
  const { updJobs } = useContext(ClientContext);
  const [dataJobs, setDataJobs] = useState(Loading);
  const [originalData, setOriginalData] = useState();
  const { getToken } = useAccessToken();

  async function updateJobs() {
    // Obtengo mi ID.
    const myId = localStorage.getItem('_id');

    // Traigo todos los trabajos.
    const fetchingJobs = await fetch(endpoints.userJobs + '?limit=100', {
      headers: {
        'x-access-token': getToken()
      }
    });

    const json = await fetchingJobs.json()
    
    const allJobs = json.jobs;

    // Filtro los trabajos para obtener únicamente los míos.
    const myJobs = allJobs.filter(job => job.publisherId === myId);

    // Agrego a mis trabajos una propiedad "state", que determina el estado del trabajo.
    const myParsedJobs = parseMyJobsWithState(myJobs.reverse());
    setDataJobs(myParsedJobs);
    setOriginalData(myParsedJobs);
  }

  useEffect(() => {
    updateJobs()
  }, [updJobs])

  function filterJobs(e) {
    const selectedState = e.target.value;

    if (selectedState === "all") {
      setDataJobs(originalData);
      return
    } 

    setDataJobs(originalData.filter(job =>  job.state === e.target.value));
  }

  if (dataJobs) {
    return (
      <div>
        <div className="nav-jobs">
          <p>Trabajos</p>

          <select className="select-job" onChange={filterJobs}>
            <option value="all">Todos</option>
            <option value="active">Activo</option>
            <option value="process">En proceso</option>
            <option value="finished">Finalizado</option>
          </select>
        </div>
        {dataJobs.map((job, index)=> {
          return <CardJob key={index} job={job} />
        })}
      </div>
    )
  }
}

// Componente Add Jobs
function AddJobsSection() {

}

// Componente Card Job
function CardJob({job}) {
  const { setJobIdModal } = useContext(ClientContext);
  
  if (job) {
    return (
      <div className='job-card' key={job.id} onClick={() => setJobIdModal(job.id)}>    
        <p>{job.title}</p>
        <p className='category'>{job.category}</p>
        <p className="description">{job.description}</p>
        <div className="div-state"><JobStateSpan state={job.state}/></div>
      </div>
    )
  }
}

// Modal for Jobs.
function ModalJob() {
  const { updModal, jobIdModal } = useContext(ClientContext);
  const [dataJobModal, setDataJobModal] = useState(Loading);
  const { getToken } = useAccessToken();

  async function fetchingDataJob() {
    if (jobIdModal) {
      let res = await fetch(endpoints.userJobs + '/' + jobIdModal, {
        headers: {
          'x-access-token': getToken()
        }
      });
      let json = await res.json();
      let singleJobInModal = parseOneJobWithState(json.job);
      setDataJobModal(singleJobInModal);
    }
  }

  useEffect(() => {
    fetchingDataJob();
  }, [updModal, jobIdModal])

  return (
      <div className="add-job">
            {dataJobModal && (
              <div className="job-post">
                <div className="div-state"><JobStateSpan state={dataJobModal.state} /></div>
                <p>{dataJobModal.title}</p>
                <hr />
                <br />
                <p>{dataJobModal.description}</p>
                <br />
              </div>
            )}
          {dataJobModal && 
            <div className="section-applicants">
              <JobApplicants job={dataJobModal} />
            </div>
          }
      </div>
  )
}

// Applicants
function JobApplicants({job}) {
  const { getToken } = useAccessToken();
  const { updModal, setUpdModal, updJobs, setUpdJobs } = useContext(ClientContext);
  const [workerSelected, setWorkerSelected] = useState(false);

  async function startJob(id) {
    let res = await fetch(endpoints.userJobs + '/' + job.id + '/start', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      },
      body: JSON.stringify({
        userId: id
      })
    })
    .then(() => {
      setUpdModal(!updModal);
      setUpdJobs(!updJobs);
    })
  }

  async function finishJob() {
    let res = await fetch(endpoints.userJobs + '/' + job.id + '/finish', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      }
    })
    .then(() => {
      setUpdModal(!updModal);
      setUpdJobs(!updJobs);
    })
  }

  async function selectWorker(e) {
    const Profile = ({data}) => {
      return (
        <div className="profile-worker">
          <p>{data.username}</p>
          <div className="div-center"><button className="btn select-worker" onClick={() => {startJob(data.userId)}}>Seleccionar trabajador</button></div>
        </div>
      )
    }

    setWorkerSelected(<Profile data={JSON.parse(e.target.value)} />)
  }

  const ConfirmFinished = () => {
    return (
      <div className="div-confirm-reject">
          <p className="text-confirm">¿Seguro que quieres marcar como completado este trabajo?</p>
          <span className="btns-finish">
            <button className="btn confirm-finish" onClick={finishJob}>SÍ</button>
            <button className="btn cancel-finish" onClick={() => setTextConfirm(<></>)}>NO</button>
          </span>
        </div>
    )
  }

  const [textConfirm, setTextConfirm] = useState(<></>);

  if (job.finished) {
    return (
      <p>Trabajo finalizado.</p>
    )
  } else if (job.finalApplicant) {
    return (
      <div>
        <p>Trabajador seleccionado: {job.finalApplicant.username}</p>
        <button className="btn finish-job" onClick={() => setTextConfirm(<ConfirmFinished />)}>Marcar trabajo como completado</button>
        { textConfirm }
      </div>
    )
  } else {
    return (
      job.applicants.length == 0 ?

      (<p>No hay postulantes.</p>) :
      
      (<div>
        Postulantes
        <select className="select-applicants" defaultValue="" onChange={selectWorker}>
          <option key="A" value=" "></option>
          {job.applicants.map((el, index) => {
            
            return (
              <option key={index} value={JSON.stringify(el)}>{el.username}</option>
            )
          })}
        </select>
        { 
          workerSelected &&
          workerSelected
        }
      </div>)

    )
  }
}

function JobStateSpan({state}) {
  if (state === 'finished') {
    return (
      <span className="finished state">Finalizado</span>
    )
  }

  if (state === 'active') {
    return (
      <span className="active state">Activo</span>
    )
  }

  if (state === 'process') {
    return (
      <span className="process state">En proceso</span>
    )
  }
  
}

/////// -------------------------------- Constants, Functions ----------------------------------------------------------

const Loading = false;

// Function Add State Property for many jobs.

function parseMyJobsWithState(myJobs) {

  const newJobs = myJobs.map(job => {
    
    if (job.finished) {
      return { ...job, state: 'finished'}
    } else if (job.finalApplicant) {
      return { ...job, state: 'process' }
    } else {
      return { ...job, state: 'active' }
    }

  });

  return newJobs;
}

// Funcion Add State Property for one single job.

function parseOneJobWithState(oneJob) {

  if (oneJob.finished) {
    return { ...oneJob, state: 'finished'}
  } else if (oneJob.finalApplicant) {
    return { ...oneJob, state: 'process' }
  } else {
    return { ...oneJob, state: 'active' }
  }
}