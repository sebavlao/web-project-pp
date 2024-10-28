import { Box } from "@mui/material";
import variablesCSS from "../../styles/adminStyles/variablescss";
export default function BoxStyled({children, fullScreen = false, client = false}) {
    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: !fullScreen ? 'auto' : '80vh',
            width: !fullScreen ? 400 : '80%',
            color: 'whitesmoke',
            bgcolor: !client ? variablesCSS.mainColor : '#1e293b',
            border: '2px solid #000',
            borderRadius: client && '.5rem',
            boxShadow: 24,
            p: !client ? 4 : 2,
        }}> 
            {children}
        </Box>
    )
}
