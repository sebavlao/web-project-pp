import React, { useContext, useEffect } from 'react'
import { AuthAdminContext } from '../../../hooks/adminHooks/useAuth';
import variablesCSS from '../../../styles/adminStyles/variablescss';


export default function SideBar() {
    const { role } = useContext(AuthAdminContext);

    return (
        <div style={{backgroundColor: variablesCSS.secondaryColor, borderBottomRightRadius: '1rem', borderTopRightRadius: '1rem', flex: '0 0 15%', color: 'white'}}>
                <OptionBar path={'/admin'} text={'Ver usuarios'} />
                {
                    role === "superadmin" && (
                        <OptionBar path={'/admin/superadmin'} text={'Ver admins'}/>
                    )
                }
                <OptionBar path={'/admin/jobs'} text={'Ver trabajos'} />
                <OptionBar path={'/admin/logs'} text={'Ver logs'} />
                <OptionBar path={'/admin/profile'} text={'Mi perfil'} />
        </div>
    )
}

function OptionBar({path, text}) {
    return (
        <div style={{padding: '0 1rem'}}>
            <br />
            <div style={{backgroundColor: variablesCSS.mainColor, width: '100%', padding: '.5rem .5rem 0 .5rem', borderRadius: '0 .5rem .5rem 0'}}>
                <a href={path} style={{display: 'block', color: 'whitesmoke', fontSize: '.8rem', transition: 'all .5s ease'}}>{text}</a>
            </div>
        </div>
    )
}