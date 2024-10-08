import { useState } from "react";
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import endpoints from "../../../data/adminData/api";
import variablesCSS from "../../../styles/adminStyles/variablescss";
import { JobsColumns, JobsParseRows, JobsCategoriesColumns, JobsCategoriesParseRows } from "./TableData"

export default function JobsDashboard() {   
    const JobsPage = <TableDataComponentized endpoint={endpoints.jobs} columns={JobsColumns} parseRows={JobsParseRows} inputText={'Buscar por ID, autor o título'}></TableDataComponentized>;
    const JobsCategoriesPage = <TableDataComponentized endpoint={endpoints.jobsCategories} columns={JobsCategoriesColumns} parseRows={JobsCategoriesParseRows} inputText={'Buscar por ID o nombre'}></TableDataComponentized>
    const [page, setPage] = useState(JobsPage)


    return (
        <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
            <nav style={{backgroundColor: variablesCSS.formColor, display: 'flex', width: '100%', justifyContent: 'center'}}> 
                <li style={styles.listItem}><button style={styles.button} onClick={() => setPage(JobsPage)}>↑ Jobs</button></li>
                <li style={styles.listItem}><button style={styles.button} onClick={() => setPage(JobsCategoriesPage)}>↑ Jobs_categories</button></li>
            </nav>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {page}
            </div>
        </div>
    )
}

const styles = {
    listItem: {
        listStyle: 'none', 
        margin: '0 1rem', 
        padding: '.5rem'
    },
    button: {
        color: 'whitesmoke', 
        fontSize: '.8rem'
    }
}