import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { RegisterClient } from './pages/RegisterClient'
import { RegisterWorker } from './pages/RegisterWorker'
import {WorkerDashboard} from './pages/private/WorkerDashboard';
import WorkDetail from './pages/private/WorkDetail';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registro-cliente' element={<RegisterClient/>}/>
          <Route path='/registro-trabajador' element={<RegisterWorker/>}/>
          <Route path='/dashboard-trabajador' element={<WorkerDashboard/>}/>       
          <Route path="/dashboard-detalle-trabajador/:id" element={<WorkDetail />} />
        </Routes>
    </BrowserRouter>
    
  )
}

export default App
