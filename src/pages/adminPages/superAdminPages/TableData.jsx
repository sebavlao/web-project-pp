import ActionsButtons from "../../../components/adminComponents/Modals/ActionsButtons"


// Filas/Registros para Admins
function SuperAdminParseRows(json) {
    const rows = json.map(admin => {
        return {
            username: <a href={"/superadmin/info/" + admin._id}>{admin.username}</a>,
            nameuser: admin.username,
            type: admin.userType,
            isActive: admin.isActive ? 'activo' : 'baneado',
            created: admin.createdAt.split('T')[0],
            actions: <ActionsButtons type={'admin'} id={admin._id} />
        }
    })

    return rows
}

// Columnas para Admins
const SuperAdminColumns = [
    {
        name: "Nombre de usuario",
        selector: row => row.username,
        width: '20%',
    },
    {
        name: 'Tipo',
        selector: row => row.type,
        sortable: true,
        width: '20%'
    },
    {
        name: 'Activo',
        sortable: true,
        selector: row => row.isActive,
        width: '15%'
    },
    {
        name: 'Creado',
        sortable: true,
        selector: row => row.created,
        width: '15%'
    },
    {
        name: 'Acciones',
        sortable: true,
        selector: row => row.actions,
        width: '30%'
    }
]

export {
    SuperAdminColumns,
    SuperAdminParseRows
}