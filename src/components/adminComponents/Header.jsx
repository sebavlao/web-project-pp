import { useContext } from "react"
import { AuthAdminContext } from "../../hooks/adminHooks/useAuth";
import variablesCSS from "../../styles/adminStyles/variablescss";

export default function Header() {
    const { setToken, setRole } = useContext(AuthAdminContext);

    function logOut() {
        setToken(false)
        setRole(false)
        window.location.href = '/admin-login'
    }

    return (
        <div style={{backgroundColor: variablesCSS.secondaryColor, color: 'white', padding: '.5rem', borderBottom: 'medium solid ' + variablesCSS.mainColor}}>
            <button onClick={logOut} style={{backgroundColor: variablesCSS.mainColor, padding: '.3rem', borderRadius: '.3rem'}}><img src="./../../../admin/door-01.png" alt="" style={{display: 'inline', marginRight: '.3rem'}}/>Cerrar sesión</button>
        </div>
    )
}