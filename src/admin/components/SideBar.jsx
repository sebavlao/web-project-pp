import React, { useContext, useEffect } from 'react'
import { AuthAdminContext } from '../hooks/useAuth'
import variablesCSS from '../styles/variablescss';

export default function SideBar() {
    const { role } = useContext(AuthAdminContext);

    useEffect(() => {
        console.log(role)
    }, [])

    return (
        <div style={{backgroundColor: variablesCSS.secondaryColor, borderBottomRightRadius: '1rem', borderTopRightRadius: '1rem', flex: '0 0 15%', color: 'white'}}>
            <a href="">Ver usuarios</a>
            {
                role === "superadmin" && (
                    <>
                    <br />
                    <a href='/admin'>Ver admins</a>
                    </>
                )
            }
        </div>
    )
}