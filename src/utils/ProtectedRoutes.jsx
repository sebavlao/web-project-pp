import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoutes = ({ children }) => {
    const auth = useAuth()
    
    return auth ? <Outlet>{children}</Outlet> : <Navigate to="/"></Navigate>
}