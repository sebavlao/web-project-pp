import React, { useEffect, useState } from 'react'
import endpoints from '../../data/adminData/api';
import { useAccessToken } from '../../hooks/useAccessToken';
import { pagination } from './WorkerDashboard';
import WorkList from '../../components/WorkList';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';

const MyJobsWorker = () => {
  const { getToken } = useAccessToken();
  const [pages, setPages] = useState();
  const [lengthJobs, setLengthJobs] = useState(false);
  const [initialPage, setInitialPage] = useState();

  useEffect(() => {
    async function getWorkerJobs() {
        const totalEndpoints = [endpoints.me, endpoints.userJobs + '?limit=10000'];
        const res = totalEndpoints.map(async (el) => {
            let fetching = await fetch(el, {
                headers: {
                    'x-access-token': getToken()
                }
            })

            let json = await fetching.json();
            return json
        })

        const jsons = await Promise.all(res);
        const allJobs = jsons[1].jobs;
        let usernameWorker = jsons[0].username;
        const myJobs = allJobs.filter(el => el.finalApplicant && el.finalApplicant.username === usernameWorker);
        setLengthJobs(myJobs.length);
        const totalPages = pagination(myJobs);
        setPages(totalPages);
        setInitialPage(totalPages[0]);
    }

    getWorkerJobs()

  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 container-worker">
        <div className="w-full max-w-4xl pt-20">
        <div className='options-works' style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="pages" style={{marginBottom: '1rem'}}>
                <span style={{marginRight: '.5rem'}}>Páginas</span>
                { pages && pages.map((el, index) => {
                    return (
                    <button className='page' key={index} onClick={() => setInitialPage(el)}>{index + 1}</button>
                    )
                })}
            </div>
            
            <div>
                <span>Matcheaste con {lengthJobs && lengthJobs} trabajos</span>
                <ChecklistRtlOutlinedIcon sx={{marginLeft: '.5rem'}}/>
            </div>
        </div>
        { pages && 
            <WorkList works={initialPage}/>
        }
        </div>
    </div>
  )
}

export default MyJobsWorker