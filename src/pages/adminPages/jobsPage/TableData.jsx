import ActionsButtons from "../../../components/adminComponents/Modals/ActionsButtons";

// Filas/Registros para la tabla de Jobs

function JobsParseRows(json) {
    const rows = json.map(job => {
        return {
            id: job._id,
            autor: job.publisher,
            title: job.title,
            description: job.description,
            created: job.createdAt,
            state: job.finished ? 'cerrado' : 'activo',
            actions: <ActionsButtons id={job._id} type={'jobs'} />
        }
    })

    return rows
}

// Columnas para la tabla de Jobs
const JobsColumns = [
    {
        name: "ID",
        selector: row => row.id,
        width: '20%',
    },
    {
        name: "Autor",
        selector: row => row.autor,
        width: '10%'
    },
    {
        name: 'Titulo',
        selector: row => row.title,
        sortable: true,
        width: '20%'
    },
    {
        name: 'Descripcion',
        sortable: true,
        selector: row => row.description,
        width: '10%'
    },
    {
        name: 'Publicado',
        sortable: true,
        selector: row => row.created,
        width: '10%'
    },
    {
        name: 'Estado',
        sortable: true,
        selector: row => row.state,
        width: '10%'
    },
    {
        name: 'Acciones',
        sortable: true,
        selector: row => row.actions,
        width: '20%'
    }
]

// Filas/Registros para la tabla de Jobs_Categories

function JobsCategoriesParseRows(json) {
    const rows = json.map(jobCategorie => {
        return {
            id: jobCategorie._id,
            name: jobCategorie.category,
            actions: <ActionsButtons id={jobCategorie._id} type={"jobscategories"} />
        }
    })

    return rows
}

const JobsCategoriesColumns = [
    {
        name: "ID",
        selector: row => row.id,
        width: '33,3%',
    },
    {
        name: "Nombre",
        selector: row => row.name,
        sortable: true,
        width: '33,3%'
    },
    {
        name: "Acciones",
        selector: row => row.actions,
        width: '33,3%'
    }
]

export {
    JobsParseRows,
    JobsColumns,
    JobsCategoriesParseRows,
    JobsCategoriesColumns
}