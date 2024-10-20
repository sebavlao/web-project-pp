import { useContext, useState } from "react";
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import endpoints from "../../../data/adminData/api";
import variablesCSS from "../../../styles/adminStyles/variablescss";
import { JobsColumns, JobsParseRows, JobsCategoriesColumns, JobsCategoriesParseRows } from "./TableData"
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";
import AdminModal from "../../../components/adminComponents/Modals/AdminModal";
import FormCreate from "../../../components/adminComponents/Forms/CreateRegister";

export default function JobsDashboard() {   
    const { token, setReload, reload } = useContext(AuthAdminContext)

    const JobsPage = <TableDataComponentized endpoint={endpoints.jobs} columns={JobsColumns} parseRows={JobsParseRows} inputText={'Buscar por ID, autor o título'} selectJobs={true}></TableDataComponentized>;
    const JobsCategoriesPage = 
    <>
        <AdminModal logo={'create category'}><FormCreate endpoint={endpoints.jobsCategories} token={token} properties={['category']}></FormCreate></AdminModal>
        <TableDataComponentized endpoint={endpoints.jobsCategories} columns={JobsCategoriesColumns} parseRows={JobsCategoriesParseRows} inputText={'Buscar por ID o nombre'}></TableDataComponentized>
    </>
    const [page, setPage] = useState(JobsPage)

    return (
        <div style={{display: 'flex', width: '100%', flexDirection: 'column', height: 'auto', overflowY: 'scroll'}}>
            <nav style={{backgroundColor: variablesCSS.formColor, display: 'flex', width: '100%', justifyContent: 'center'}}> 
                <li style={styles.listItem}><button style={styles.button} onClick={() => setPage(JobsPage)}>↑ Jobs</button></li>
                <li style={styles.listItem}><button style={styles.button} onClick={() => {
                    setPage(JobsCategoriesPage) 
                    setReload(!reload)
                }}>↑ Jobs_categories</button></li>
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