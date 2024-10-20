import { Typography } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";
import BoxStyled from "../Box";

export function ModalDelete({ id, endpoint, text, method = null }) {
    const [confirm, setConfirm] = useState(false);
    const { token, reload, setReload } = useContext(AuthAdminContext);

    const remove = async () => {
        let res = await fetch(endpoint + id, {
            method: !method ? "PATCH" : method,
            headers: {
                'x-access-token': token
            }
        });

        let json = await res.json();
        setConfirm(false);
        setReload(!reload);
    };

    useEffect(() => {
        if (confirm) remove();
    }, [confirm]);


    return (
        <BoxStyled>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { text }
          </Typography>
          <button onClick={remove}>Aceptar</button>
        </BoxStyled>
    )
}

