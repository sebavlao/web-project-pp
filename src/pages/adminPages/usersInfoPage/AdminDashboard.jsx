import endpoints from "../../../data/adminData/api";
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import { UsersInfoColumns, UsersInfoParseRows } from "./TableData";
import variablesCSS from "../../../styles/adminStyles/variablescss";
import "./styles.css"
import AdminModal from "../../../components/adminComponents/Modals/AdminModal";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FormUser } from "../../../components/adminComponents/Forms/User/FormAdd&Edit";
import BoxStyled from "../../../components/adminComponents/Box";

export default function AdminDashboard() {

    return (
        <div style={{display: 'flex', maxHeight: 'auto', overflowY: 'auto', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
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
        <BoxStyled>
            <FormUser method={"POST"} endpoint={endpoints.users}/>
        </BoxStyled>
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
    }
}
