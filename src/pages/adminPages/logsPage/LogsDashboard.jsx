import TableDataComponentized from "../../../components/adminComponents/TableComponentized";
import endpoints from "../../../data/adminData/api";
import { LogsColumns, LogsParseRows } from "./TableData";

export default function LogsDashboard() {

    return (
        <div style={{height: 'auto', width: '100%', overflowY: 'scroll', display: 'flex'}}>
            <TableDataComponentized endpoint={endpoints.logs} columns={LogsColumns} parseRows={LogsParseRows} inputText={'Buscar por ID, IP o username'}></TableDataComponentized>
        </div>
    )
}