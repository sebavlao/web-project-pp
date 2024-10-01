import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { RegisterClient } from "./pages/RegisterClient";
import { RegisterWorker } from "./pages/RegisterWorker";
import { WorkerDashboard } from "./pages/private/WorkerDashboard";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro-cliente" element={<RegisterClient />} />
          <Route path="/registro-trabajador" element={<RegisterWorker />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard-trabajador" element={<WorkerDashboard />} />
            <Route
              path="/dashboard-cliente"
              element={<h1>Bienvenido cliente</h1>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
