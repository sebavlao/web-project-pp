import { useContext } from "react"
import { AuthAdminContext } from "../hooks/useAuth"
import variablesCSS from "../styles/variablescss";

export default function Header() {
    const { setToken, setRole } = useContext(AuthAdminContext);

    function logOut() {
        setToken(false)
        setRole(false)
        window.location.href = '/admin-login'
    }

    return (
        <div style={{backgroundColor: variablesCSS.secondaryColor, height: '3rem', color: 'white'}}>
            <button onClick={logOut}>Cerrar sesión</button>
        </div>
    )
}