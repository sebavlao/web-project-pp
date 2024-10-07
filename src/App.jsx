import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { RegisterClient } from './pages/RegisterClient'
import { RegisterWorker } from './pages/RegisterWorker'
import {WorkerDashboard} from './pages/private/WorkerDashboard';
import AuthAdminProvider from './hooks/adminHooks/useAuth'
import AdminLogin from './pages/adminPages/AdminLogin'
import AdminLayout from './components/adminComponents/AdminLayout'
import AdminDashboard from './pages/adminPages/AdminDashboard'
import AdminProfile from './pages/adminPages/AdminProfile'
import InfoUser from './pages/adminPages/InfoUser'

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
            <Route path='/auth/admin-login' element={<AdminLogin />}/>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminDashboard></AdminDashboard>} />
              <Route path='/admin/profile' element={<AdminProfile></AdminProfile>} />
              <Route path='/admin/user/:id' element={<InfoUser></InfoUser>} />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthAdminProvider>
  )
}

export default App
