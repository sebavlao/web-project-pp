import { Box } from "@mui/material";
import variablesCSS from "../../styles/adminStyles/variablescss";
export default function BoxStyled({children, fullScreen = false}) {
    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: !fullScreen ? 'auto' : '80vh',
            width: !fullScreen ? 400 : '80%',
            color: 'whitesmoke',
            bgcolor: variablesCSS.mainColor,
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}> 
            {children}
        </Box>
    )
}
