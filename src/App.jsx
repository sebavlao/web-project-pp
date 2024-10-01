import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { RegisterClient } from './pages/RegisterClient'
import { RegisterWorker } from './pages/RegisterWorker'
import {WorkerDashboard} from './pages/private/WorkerDashboard';
import LoginAdmin from './admin/pages/Login'
import AuthAdminProvider from './admin/hooks/useAuth'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminLayout from './admin/components/LayoutAdmin'
import AdminProfile from './admin/pages/AdminProfile'
import InfoUser from './admin/pages/InfoUser'

function App() {
  return (
    <AuthAdminProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home></Home>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registro-cliente' element={<RegisterClient/>}/>
            <Route path='/registro-trabajador' element={<RegisterWorker/>}/>
            <Route path='/dashboard-trabajador' element={<WorkerDashboard/>}/>
            <Route path='/admin-login' element={<LoginAdmin />}/>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminDashboard></AdminDashboard>} />
              <Route path='/admin/user/:id' element={<InfoUser></InfoUser>} />
              <Route path='/admin/profile' element={<AdminProfile></AdminProfile>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthAdminProvider>
  )
}

export default App
