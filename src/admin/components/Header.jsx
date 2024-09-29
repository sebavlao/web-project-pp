import { useContext } from "react"
import { AuthAdminContext } from "../hooks/useAuth"

export default function Header() {
    const { setToken, setRole } = useContext(AuthAdminContext);

    function logOut() {
        setToken(false)
        setRole(false)
        window.location.href = '/admin-login'
    }

    return (
        <div style={{backgroundColor: 'lightblue', height: '3rem'}}>
            <button onClick={logOut}>Cerrar sesión</button>
        </div>
    )
}