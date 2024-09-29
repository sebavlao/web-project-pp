import React, { useContext, useEffect } from 'react'
import { AuthAdminContext } from '../hooks/useAuth'

export default function SideBar() {
    const { role } = useContext(AuthAdminContext);

    useEffect(() => {
        console.log(role)
    }, [])

    return (
        <div style={{backgroundColor: 'lightgray', flex: '0 0 15%'}}>
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