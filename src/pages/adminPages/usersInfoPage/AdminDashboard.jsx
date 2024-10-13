import endpoints from "../../../data/adminData/api";
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import { UsersInfoColumns, UsersInfoParseRows } from "./TableData";
import variablesCSS from "../../../styles/adminStyles/variablescss";
import "./styles.css"
import AdminModal from "../../../components/adminComponents/Modals/AdminModal";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box } from "@mui/material";
import { FormUser } from "../../../components/adminComponents/Forms/User/FormAdd&Edit";

export default function AdminDashboard() {

    return (
        <div style={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
            <div className="header" 
                style={styles.header}>
                <AdminModal logo={<div style={{color: 'white'}}>Crear usuario | <PersonAddIcon style={{color: 'white'}} /></div>} children={<FormAdd />} />
            </div>
            <TableDataComponentized endpoint={endpoints.usersInfo} columns={UsersInfoColumns} parseRows={UsersInfoParseRows} inputText={'Buscar por username o email'}></TableDataComponentized>
        </div>
    )
}

function FormAdd() {
    return (
        <Box sx={styles.box}>
            <FormUser method={"POST"} endpoint={endpoints.users}/>
        </Box>
    )
}


const styles = {
    header: {
        width: '80%', 
        backgroundColor: variablesCSS.formColor, 
        marginTop: '1.5rem', 
        borderBottom: 'thin solid whitesmoke', 
        fontSize: '.8rem', 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        color: 'whitesmoke'
    },
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: 'whitesmoke',
        bgcolor: variablesCSS.secondaryColor,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
}