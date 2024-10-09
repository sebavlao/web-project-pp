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
              <Route path="/dashboard-detalle-trabajador/:id" element={<WorkDetail />} />
              <Route path='/auth/admin-login' element={<AdminLogin />}/>
              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<AdminDashboard></AdminDashboard>} />
                <Route path='/admin/profile' element={<AdminProfile></AdminProfile>} />
                <Route path='/admin/user/:id' element={<InfoUser></InfoUser>} />
                <Route path='/admin/jobs' element={<JobsDashboard></JobsDashboard>} />
                <Route path='/admin/logs' element={<LogsDashboard></LogsDashboard>} />
                <Route path='/admin/superadmin' element={<SuperAdminDashboard></SuperAdminDashboard>} />
              </Route>
            </Routes>
        </BrowserRouter>
      </AuthAdminProvider>
    </AuthProvider>
  )
}

export default App;
