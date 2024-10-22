import React, { useEffect, useState } from 'react'
import { API_CURRENT_USER, API_JOBS } from '../api/api'
import './styles.css'
import { Modal } from '@mui/material';
import BoxStyled from './adminComponents/Box';

export const ClientHome = () => {
  const [userInfo, setUserInfo] = useState(false);
  const [jobs, setJobs] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoints = [API_CURRENT_USER, API_JOBS];

    const getData = async () => {
      let data = endpoints.map(async el => {
        return await el.get();
      })
      
      Promise.all(data)
      .then(response => {
        setUserInfo(response[0].data)
        setJobs(addState(response[1].data.jobs))
        setLoading(false)
      })
    }

    getData()
  }, [])


  return (
    <div>
      {loading ?
        <p style={styles.loading}>Cargando...</p> :
        <div className="home-view" style={styles.home}>
          <div className="user-profile"><ProfileHome data={userInfo} /></div>
          <div className="user-jobs"><JobsHome jobs={jobs} id={userInfo._id} /></div>
          <div className="add-jobs"><AddJobsSection /></div>
        </div>
      }
    </div>
  )
}

function ProfileHome({data}) {
  return (
    <>
      <div className="profile-component">
        <h1>{data.username}</h1>  
        <hr />
      </div>
      <div className='profile-component'>
        <p>{data.name} {data.surname}</p>
        <p>Correo electrónico: {data.email}</p>
      </div>
    </>
  )
}

function JobsHome({jobs, id}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const filterJobs = jobs.filter(el => el.publisherId == id).reverse();
  const [cardJobs, setCardJobs] = useState(filterJobs.map(job => {
    return (
      <CardJob data={job} openModal={handleOpen} setModalContent={setModalContent} />
    )
  }))

  return (
    <div>
      <div className="nav-jobs">
        <p>Mis trabajos</p>
        <Modal 
          open={openModal}
          onClose={handleClose}>
            <BoxStyled fullScreen={true}>
              {modalContent}
            </BoxStyled>
        </Modal>
        <SelectJobs jobs={filterJobs} setCardJobs={setCardJobs} handleOpen={handleOpen} setModalContent={setModalContent} />
      </div>
      {cardJobs}
    </div>
  )
}

function SelectJobs({jobs, setCardJobs, handleOpen, setModalContent}) {
  function selectByState(e) {
    if (e.target.value === 'Todos') {
      setCardJobs(jobs.map(el => {
        return <CardJob data={el} openModal={handleOpen} setModalContent={setModalContent} />
      }))
    } else {
      const newJobs = jobs.filter(el => el.state === e.target.value)
      setCardJobs(newJobs.map( el => {
        return <CardJob data={el} openModal={handleOpen} setModalContent={setModalContent} />
      }))
    }
  }
  
  return (
    <select className='select-job' onChange={selectByState}>
      <option value={'Todos'}>Todos</option>
      <option value={'En proceso'}>En proceso</option>
      <option value={'Activo'}>Activo</option>
      <option value={'Finalizado'}>Finalizado</option>
    </select>
  )
}

function CardJob({data, openModal, setModalContent}) { 

  function openJobPost() {
    openModal()
    setModalContent(<JobPost data={data}/>)
  }

  return (
    <div className='job-card' key={data.title} onClick={openJobPost}>    
      <p>{data.title}</p>
      <p className='category'>{data.category}</p>
      <p className="description">{data.description}</p>
      <p className='div-state'><DeterminateState state={data.state}/></p>
    </div>
  )
}

function JobPost({data}) {

  return (
    <div className="job-post">
      <p>{data.title}</p>
      <p>{data.description}</p>
      {data.applicants.length > 0 && (
        <>
        <select className='select-applicants'>
          <OptionApplicants applicants={data.applicants} />
        </select>
        <p>
        ////// **** Próximamente agrego la implementación para que se vea los datos del usuario en vez de su ID.</p>
        </>
      )}
    </div>
  )
} 

function OptionApplicants({applicants}) {
  const workersApplicants = applicants.map(el => {
    return (
      <option value={el}>{el}</option>
    )
  })

  return (
    <>
      {workersApplicants}
    </>
  )
}

function DeterminateState({state}) {
  if (state === 'En proceso') {
    return <span className='process state'>En proceso</span>
  } else if (state === 'Activo') {
    return <span className='active state'>Activo</span>
  } else {
    return <span className='finished state'>Finalizado</span>
  }
}

function addState(jobs) {
  const jobsWithState = jobs.map(el => {
    let state;

    if (el.finalApplicant && !el.finished) {
      state = 'En proceso';
    } else if (!el.finalApplicant & !el.finished) {
      state = 'Activo';
    } else {
      state = 'Finalizado';
    }

    return {
      ...el,
      state
    }
  })

  return jobsWithState
}

function AddJobsSection() {
  return (
    <div className='add-job'> 
      <a href='/cliente/solicitud-trabajo' className='anchor-add-job'>+ | Crear trabajo</a>
    </div>
  )
}

const styles = {
  loading: {
    height: '100vh'
  }
}