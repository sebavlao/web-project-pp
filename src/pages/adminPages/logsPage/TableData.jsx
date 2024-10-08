// Filas/Registros de los Logs

function LogsParseRows(json) {
    const rows = json.logs.map(log => {
        return {
            id: log._id,
            username: log.username,
            ip: log.ipAddress,
            role: log.role,
            method: log.requestMethod,
            url: log.requestUrl
        }
    })

    return rows
}

// Columnas para los Logs
const LogsColumns = [
    {
        name: "ID",
        selector: row => row.id,
        width: '20%',
    },
    {
        name: 'Username',
        sortable: true,
        selector: row => row.username,
        width: '10%'
    },
    {
        name: 'IP Adress',
        sortable: true,
        selector: row => row.ip,
        width: '10%'
    },
    {
        name: 'Rol',
        sortable: true,
        selector: row => row.role,
        width: '20%'
    },
    {
        name: 'Request Method',
        sortable: true,
        selector: row => row.method,
        width: '10%'
    },
    {
        name: 'Request URL',
        sortable: true,
        selector: row => row.url,
        width: '20%'
    }
]

export {
    LogsColumns,
    LogsParseRows
}