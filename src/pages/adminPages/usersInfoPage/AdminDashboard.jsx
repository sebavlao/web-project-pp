import endpoints from "../../../data/adminData/api";
import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import { UsersInfoColumns, UsersInfoParseRows } from "./TableData";

export default function AdminDashboard() {

    return (
        <TableDataComponentized endpoint={endpoints.usersInfo} columns={UsersInfoColumns} parseRows={UsersInfoParseRows} inputText={'Buscar por username o email'}></TableDataComponentized>
    )
}


