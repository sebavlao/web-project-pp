import React, { useContext, useEffect, useState } from 'react'; 
import WorkList from '../../components/WorkList';
import { useGetWorks } from '../../hooks/useGetWorks';
import { useAccessToken } from '../../hooks/useAccessToken';
import { ClientContext } from '../../context/ClientContext';
import endpoints from '../../data/adminData/api';
import { Box } from '@mui/material';

// El dashboard trabajador debe ser una ruta privada, agregar lógica via auth context.

export const WorkerDashboard = () => {
  const { getToken, getUser } = useAccessToken();
  let { category } = useContext(ClientContext);
  const [modalCategories, setModalCategories] = useState(false);
  const handleOpen = () => setModalCategories(true);
  const [pages, setPages] = useState(false);
  const [initialPage, setInitialPage] = useState();
  
  const { works: fetchedWorks } = useGetWorks(); // Obtienes la lista de trabajos

  // Maneja el estado cuando los trabajos se hayan cargado
  useEffect(() => {
    if (fetchedWorks) {
      if (category === "all") {
        const paginas = pagination(fetchedWorks.jobs);
        if (paginas) {
          setPages(paginas)
          setInitialPage(paginas[0])
        }
      } else {
        if (fetchedWorks) {
          setTimeout(() => {
            const filterWorks = fetchedWorks.jobs.filter(job => job.category === category);
            const paginas = pagination(filterWorks);
            if (paginas) {
              setPages(paginas)
              setInitialPage(paginas[0])
            }
          }, 500);
        }
      }
    }
  }, [fetchedWorks, category]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 container-worker">
      <div className="w-full max-w-4xl pt-20">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 border-2  rounded-lg p-4 bg-white shadow-lg">
        Lista de Trabajos
      </h1>
        <div className='options-works' style={{display: 'flex', justifyContent: 'space-around'}}>
          <div className="pages">
          { pages && pages.map((el, index) => {
            return (
              <button className='page' key={index} onClick={() => setInitialPage(el)}>{index + 1}</button>
            )
          })}
          </div>
          <br />
        
          <button className='select-category' onClick={handleOpen}>Seleccionar categoría</button>
        </div>
        <SelectCategories 
          modalCategories={modalCategories}
          setModalCategories={setModalCategories}  
        />
        
        { pages && 
        <WorkList works={initialPage} />}
      </div>
    </div>

  );
}; 


function SelectCategories({modalCategories, setModalCategories}) {
  const { getToken, getUser } = useAccessToken();
  const handleClose = () => setModalCategories(false);
  const [categories, setCategories] = useState(false);
  let { setCategory } = useContext(ClientContext);
  const [viewCategories, setViewCategories] = useState([]);

  async function getCategories() {
    let res = await fetch(endpoints.jobsCategories, {
      headers: {
        'x-access-token': getToken()
      }
    })

    let json = await res.json()
    setCategories(json);
    setViewCategories(json.map((el, index) => {
      return (
        <p key={index} className='category-item' onClick={() => setCategory(el.category)}>{el.category}</p>
      )
    }))
  }

  useEffect(() => {
    getCategories()
  }, [])

  function searchCategory(e) {
    const searchedCategory = categories.filter(el => {
      return el.category.toLowerCase().includes(e.target.value.toLowerCase());
    });
    const updatedCategories = searchedCategory.map((el, index) => {
      return (
        <p key={index} className='category-item' onClick={() => setCategory(el.category)}>{el.category}</p>
      )
    })
    setViewCategories(updatedCategories)
  }


  if (modalCategories) {
    return (
      <div>
        <Box sx={styles.box}> 
          <button onClick={handleClose} style={{position: 'absolute', top: '.5rem', right: '2rem'}}>X</button>
          <input style={{position: 'absolute', left: '2rem', top: '.5rem', color: 'black'}} onChange={searchCategory} placeholder='Buscar categoría' />
          <div style={{height: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
            <p className='category-item' onClick={() => setCategory('all')}>todos</p>
            { viewCategories }
          </div>
        </Box>
        
      </div>
    )
  }
}


function pagination(array) {
  if (array) {
  let itemsPerPage = 5;
  let pages = Math.ceil(array.length / itemsPerPage);
  let itemsWithPage = [];
  let guia = 0;

  for (let index = 0; index < pages; index++) {
    let item = []
    for (let j = 0; j < itemsPerPage; j++, guia++) {
      if (array[guia]) {
        item.push(array[guia])
      }
    }
    itemsWithPage.push(item)
    item = []
  }
  return itemsWithPage
  }
}


const styles = {
  box: {
    position: 'fixed',
    top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '80vh',
      width: '80%',
      border: '2px solid #000',
      borderRadius:'.5rem',
      boxShadow: 24,
      p: 4,
      bgcolor: 'whitesmoke',
      color: 'black',
      overflowY: 'scroll'
    }
}