import { useContext } from "react"
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";
import variablesCSS from "../../../styles/adminStyles/variablescss";

export default function Header() {
    const { setToken, setRole } = useContext(AuthAdminContext);

    function logOut() {
        setToken(false)
        setRole(false)
        window.location.href = '/auth/admin-login'
    }

    return (
        <div style={{backgroundColor: variablesCSS.secondaryColor, color: 'white', padding: '.5rem', borderBottom: 'medium solid ' + variablesCSS.mainColor, display: 'flex'}}>
            <button onClick={logOut} style={{backgroundColor: variablesCSS.mainColor, padding: '.3rem', borderRadius: '.3rem', fontSize: '.8rem', flex: '0 0 10%'}}><img src="./../../../admin/door-01.png" alt="" style={{display: 'inline', marginRight: '.3rem'}}/>Cerrar sesión</button>
            <div style={{flex: '0 0 90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><h1 style={{backgroundColor: variablesCSS.mainColor, borderRadius: '.3rem', padding: '.3rem', fontStyle: 'italic'}}><b style={{fontSize: '1.4rem'}}>W</b>orkLink Admin</h1></div>
        </div>
    )
}