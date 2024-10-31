import React, { useContext, useEffect, useState } from 'react'; 
import WorkList from '../../components/WorkList';
import { useGetWorks } from '../../hooks/useGetWorks';
import { useAccessToken } from '../../hooks/useAccessToken';
import { ClientContext } from '../../context/ClientContext';
import endpoints from '../../data/adminData/api';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
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
      async function makePagination() {
        if (category === "all") {
          if (fetchedWorks) {
            const activeJobs = fetchedWorks.jobs.filter(job => !job.finished && !job.finalApplicant)
            const paginas = pagination(activeJobs);
            if (paginas) {
              setPages(paginas)
              setInitialPage(paginas[0])
            }
          }
        } else {
          if (fetchedWorks) {
            setTimeout(() => {
              const filterWorks = fetchedWorks.jobs.filter(job => job.category === category && !job.finished && !job.finalApplicant);
              const paginas = pagination(filterWorks);
              if (paginas) {
                setPages(paginas)
                setInitialPage(paginas[0])
              }
            }, 500);
          }
        }
      }

      makePagination()
  }, [fetchedWorks, category]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 container-worker">
      <div className="w-full max-w-4xl pt-20">
        <div className='options-works' style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className="pages">
            <span style={{marginRight: '.5rem'}}>Páginas</span>
          { pages && pages.map((el, index) => {
            return (
              <button className='page' key={index} onClick={() => setInitialPage(el)}>{index + 1}</button>
            )
          })}
          </div>
          <br />
        
          <button className='select-category' onClick={handleOpen}>
            <TuneOutlinedIcon />
            Seleccionar categoría
          </button>
        </div>
        <SelectCategories 
          modalCategories={modalCategories}
          setModalCategories={setModalCategories}  
        />
        
        { pages && 
        <WorkList works={initialPage} /> }
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
          <div style={{position: 'absolute', left: '2rem', top: '.5rem'}}>
            <SearchOutlinedIcon />
            <input style={{color: 'black'}} onChange={searchCategory} placeholder='Buscar categoría' />
          </div>
          <div style={{height: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '.5rem'}}>
            <p className='category-item' onClick={() => setCategory('all')}>todos</p>
            { viewCategories }
          </div>
        </Box>
      </div>
    )
  }
}


export function pagination(array) {
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

const translateCategories = {
  "frontend developer": "desarrollador frontend",
  "backend developer": "desarrollador backend",
  "full stack developer": "desarrollador full stack",
  "graphic designer": "diseñador gráfico",
  "web designer": "diseñador web",
  "mobile app developer": "desarrollador de aplicaciones móviles",
  "software engineer": "ingeniero de software",
  "database administrator": "administrador de bases de datos",
  "data analyst": "analista de datos",
  "seo specialist": "especialista en SEO",
  "digital marketer": "especialista en marketing digital",
  "social media manager": "gerente de redes sociales",
  "content writer": "redactor de contenido",
  "copywriter": "redactor publicitario",
  "translator": "traductor",
  "project manager": "gerente de proyecto",
  "carpenter": "carpintero",
  "electrician": "electricista",
  "plumber": "plomero",
  "painter": "pintor",
  "handyman": "personal de mantenimiento",
  "gardener": "jardinero",
  "landscape designer": "diseñador de paisajes",
  "interior designer": "diseñador de interiores",
  "mason": "albañil",
  "roofer": "techador",
  "tiler": "alicatador",
  "cleaner": "limpiador",
  "pest control specialist": "especialista en control de plagas",
  "hvac technician": "técnico de HVAC",
  "mechanic": "mecánico",
  "delivery driver": "repartidor",
  "personal trainer": "entrenador personal",
  "nutritionist": "nutricionista",
  "pet groomer": "peluquero de mascotas",
  "dog walker": "paseador de perros",
  "childcare provider": "proveedor de cuidado infantil",
  "tutor": "tutor",
  "music instructor": "instructor de música",
  "photographer": "fotógrafo",
  "videographer": "videógrafo",
  "event planner": "planificador de eventos",
  "bartender": "barman",
  "chef": "chef",
  "baker": "panadero",
  "waitstaff": "personal de servicio",
  "security guard": "guardia de seguridad",
  "house sitter": "cuidador de casas",
  "virtual assistant": "asistente virtual",
  "it support technician": "técnico de soporte informático",
  "network administrator": "administrador de redes",
  "cybersecurity specialist": "especialista en ciberseguridad",
  "quality assurance tester": "probador de aseguramiento de calidad",
  "business consultant": "consultor de negocios",
  "financial advisor": "asesor financiero",
  "tax consultant": "consultor fiscal",
  "real estate agent": "agente inmobiliario",
  "insurance agent": "agente de seguros",
  "sales representative": "representante de ventas",
  "research assistant": "asistente de investigación",
  "social worker": "trabajador social",
  "therapist": "terapeuta",
  "nurse": "enfermero",
  "medical assistant": "asistente médico",
  "occupational therapist": "terapeuta ocupacional",
  "physical therapist": "fisioterapeuta",
  "yoga instructor": "instructor de yoga",
  "personal assistant": "asistente personal",
  "travel agent": "agente de viajes",
  "auto detailer": "detallador de autos",
  "locksmith": "cerrajero",
  "upholsterer": "tapicero",
  "window cleaner": "limpiador de ventanas",
  "floor installer": "instalador de pisos",
  "pressure washer": "lavador a presión",
  "deck builder": "constructor de cubiertas",
  "pool cleaner": "limpiador de piscinas",
  "snow removal service": "servicio de remoción de nieve",
  "moving service": "servicio de mudanzas",
  "courier service": "servicio de mensajería",
  "home inspector": "inspector de viviendas",
  "voiceover artist": "artista de doblaje",
  "event coordinator": "coordinador de eventos",
  "online tutor": "tutor en línea",
  "public relations specialist": "especialista en relaciones públicas",
  "fundraising coordinator": "coordinador de recaudación de fondos",
  "database developer": "desarrollador de bases de datos",
  "web developer": "desarrollador web",
  "e-commerce specialist": "especialista en comercio electrónico",
  "mobile mechanic": "mecánico móvil",
  "financial analyst": "analista financiero",
  "hr specialist": "especialista en recursos humanos",
  "data entry clerk": "operador de entrada de datos",
  "fashion designer": "diseñador de moda",
  "video editor": "editor de videos",
  "3d modeler": "modelador 3d",
  "animation artist": "artista de animación",
  "copy editor": "corrector de textos",
  "grant writer": "escritor de subvenciones",
  "speech therapist": "terapeuta del habla",
  "wedding planner": "organizador de bodas",
  "life coach": "entrenador personal",
  "aromatherapist": "aromaterapeuta",
  "reiki practitioner": "practicante de reiki",
  "lumberjack": "leñador",
  "asdasdasdasd": "asdasdasdasd",
  "profesor de matemáticas": "profesor de matemáticas",
  "profesor de lengua": "profesor de lengua"
};
