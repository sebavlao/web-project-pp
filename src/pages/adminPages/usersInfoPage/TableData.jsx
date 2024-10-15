import ActionsButtons from "../../../components/adminComponents/Modals/ActionsButtons"

// Filas/Registros para Users
function UsersInfoParseRows(json) {
    const rows = json.map(user => {
        return {
            username: <a href={"/auth/admin/user/" + user._id}>{user.username}</a>,
            nameuser: user.username,
            email: user.email,
            verified: user.verified ? '✅' : '❌',
            type: user.userType,
            isActive: user.isActive ? 'activo' : 'baneado',
            actions: <ActionsButtons type={'user'} id={user._id}></ActionsButtons>
        }
    })

    return rows
}

// Columnas para Users
const UsersInfoColumns = [
    {
        name: "Nombre de usuario",
        selector: row => row.username,
        width: '10%',
    },
    {
        name: "Email",
        selector: row => row.email,
        width: '25%'
    },
    {
        name: 'Tipo',
        selector: row => row.type,
        sortable: true,
        width: '10%'
    },
    {
        name: 'Verificado',
        sortable: true,
        selector: row => row.verified,
        width: '15%'
    },
    {
        name: 'Activo',
        sortable: true,
        selector: row => row.isActive,
        width: '15%'
    },
    {
        name: 'Acciones',
        sortable: true,
        selector: row => row.actions,
        width: '25%'
    }
]

export {
    UsersInfoColumns,
    UsersInfoParseRows
}