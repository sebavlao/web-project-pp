import React, { useContext, useEffect } from 'react'
import { AuthAdminContext } from '../../hooks/adminHooks/useAuth';
import variablesCSS from '../../styles/adminStyles/variablescss';


export default function SideBar() {
    const { role } = useContext(AuthAdminContext);

    useEffect(() => {
        console.log(role)
    }, [])

    return (
        <div style={{backgroundColor: variablesCSS.secondaryColor, borderBottomRightRadius: '1rem', borderTopRightRadius: '1rem', flex: '0 0 15%', color: 'white'}}>
            <OptionBar path={'/admin'} text={'Ver usuarios'} />
            <OptionBar path={'/admin/profile'} text={'Mi perfil'} />
            {
                role === "superadmin" && (
                    <OptionBar path={'/superadmin'} text={'Ver admins'}/>
                )
            }
        </div>
    )
}

function OptionBar({path, text}) {
    return (
        <div style={{padding: '0 1rem'}}>
            <br />
            <a href={path} style={{color: 'whitesmoke', transition: 'all .5s ease'}}>{text}</a>
            <hr />
        </div>
    )
}