import React, { useContext, useEffect } from 'react'
import { AuthAdminContext } from '../hooks/useAuth'

export default function SideBar() {
    const { role } = useContext(AuthAdminContext);

    useEffect(() => {
        console.log(role)
    }, [])

    return (
        <div>
            <a href="">Ver usuarios</a>
            {
                role === "superadmin" && (
                    <a>Ver admins</a>
                )
            }
        </div>
    )
}