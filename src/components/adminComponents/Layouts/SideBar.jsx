import React, { useContext, useEffect } from 'react'
import { AuthAdminContext } from '../../../hooks/adminHooks/useAuth';
import variablesCSS from '../../../styles/adminStyles/variablescss';


export default function SideBar() {
    const { role } = useContext(AuthAdminContext);

    return (
        <div style={{backgroundColor: variablesCSS.secondaryColor, borderBottomRightRadius: '1rem', borderTopRightRadius: '1rem', flex: '0 0 15%', color: 'white', height: 'auto'}}>
                <OptionBar path={'/auth/admin'} text={'Ver usuarios'} src={"../../../admin/user-group.png"} />
                {
                    role === "superadmin" && (
                        <OptionBar path={'/auth/admin/superadmin'} text={'Ver admins'} src={"../../../admin/iconadmin.png"} />
                    )
                }
                <OptionBar path={'/auth/admin/jobs'} text={'Ver trabajos'} src={"../../../admin/iconjobs.png"} />            
                <OptionBar path={'/auth/admin/logs'} text={'Ver logs de admin'} src={"../../../admin/iconlogs.png" } />
        </div>
    )
}

function OptionBar({path, text, src}) {
    return (
        <div style={{padding: '0 1rem'}}>
            <br />
            <div style={{backgroundColor: variablesCSS.mainColor, width: '100%', padding: '.5rem .5rem .2rem .5rem', borderRadius: '0 .5rem 0 0', display: 'flex'}}>
                <img src={src} alt="" style={{marginRight: '.2rem'}}/>
                <a href={path} style={{display: 'block', color: 'whitesmoke', fontSize: '.8rem', transition: 'all .5s ease'}}>{text}</a>
            </div>
        </div>
    )
}


