import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { RegisterClient } from './pages/RegisterClient'
import { RegisterWorker } from './pages/RegisterWorker'
import {WorkerDashboard} from './pages/private/WorkerDashboard';
import AuthAdminProvider from './hooks/adminHooks/useAuth'
import AdminLogin from './pages/adminPages/AdminLogin'
import AdminLayout from './components/adminComponents/Layouts/AdminLayout'
import AdminDashboard from './pages/adminPages/usersInfoPage/AdminDashboard'
import AdminProfile from './pages/adminPages/AdminProfile'
import InfoUser from './pages/adminPages/usersInfoPage/InfoUser'
import SuperAdminDashboard from './pages/adminPages/superAdminPages/SuperAdminDashboard'
import JobsDashboard from './pages/adminPages/jobsPage/JobsDashboard'
import LogsDashboard from './pages/adminPages/logsPage/LogsDashboard'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AuthAdminProvider>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home></Home>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/registro-cliente' element={<RegisterClient/>}/>
              <Route path='/registro-trabajador' element={<RegisterWorker/>}/>
              <Route path='/dashboard-trabajador' element={<WorkerDashboard/>}/>
              <Route path='/auth/admin-login' element={<AdminLogin />}/>
              <Route path='/auth/admin' element={<AdminLayout />}>
                <Route index element={<AdminDashboard></AdminDashboard>} />
                <Route path='/auth/admin/profile' element={<AdminProfile></AdminProfile>} />
                <Route path='/auth/admin/user/:id' element={<InfoUser></InfoUser>} />
                <Route path='/auth/admin/jobs' element={<JobsDashboard></JobsDashboard>} />
                <Route path='/auth/admin/logs' element={<LogsDashboard></LogsDashboard>} />
                <Route path='/auth/admin/superadmin' element={<SuperAdminDashboard></SuperAdminDashboard>} />
              </Route>
            </Routes>
        </BrowserRouter>
      </AuthAdminProvider>
    </AuthProvider>
  )
}

export default App;
