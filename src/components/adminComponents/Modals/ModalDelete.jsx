import { Box, Typography } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";
import variablesCSS from "../../../styles/adminStyles/variablescss";

export function ModalDelete({ id, endpoint, text, method = null }) {
    const [confirm, setConfirm] = useState(false);
    const { token } = useContext(AuthAdminContext);

    const remove = async () => {
        let res = await fetch(endpoint + id, {
            method: !method ? "PATCH" : method,
            headers: {
                'x-access-token': token
            }
        });

        let json = await res.json();
        setConfirm(false);
        window.location.reload();
    };

    useEffect(() => {
        if (confirm) remove();
    }, [confirm]);


    return (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { text }
          </Typography>
          <button onClick={remove}>Aceptar</button>
        </Box>
    )
}

const style = {
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
};