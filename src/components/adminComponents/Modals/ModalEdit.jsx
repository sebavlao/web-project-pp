import { Box, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";
import endpoints from "../../../data/adminData/api";
import { FormEditAdmin } from "../Forms/Admin/FormEdit.jsx";
import { FormUser } from "../Forms/User/FormAdd&Edit.jsx";
import { FormEditJob } from "../Forms/Job/FormEdit";
import variablesCSS from "../../../styles/adminStyles/variablescss";
import BoxStyled from "../Box.jsx";

export function ModalEdit({ id, endpoint }) {
    const { token } = useContext(AuthAdminContext);
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const getInfo = async () => {
            let res = await fetch(endpoint + id, {
                headers: {
                    "x-access-token": token
                }
            })
            let json = await res.json();
            console.log(json)
            setData(json)
            setLoaded(true);
        }

        getInfo();
    }, [])

    function setForm() {
        if (endpoint === endpoints.users) {
            return <FormUser user={data} endpoint={endpoint+id} method={"PUT"}></FormUser>
        }

        if (endpoint === endpoints.admins) {
            return <FormEditAdmin admin={data}></FormEditAdmin>
        }

        if (endpoint === endpoints.jobs) {
            return <FormEditJob job={data}></FormEditJob>
        }
    }

    return (
        <BoxStyled>

          <Typography id="modal-modal-title" variant="h6" component="h2">
        
                {loaded ? (
                    setForm()
                ) : (
                    <p>Cargando...</p>
                )}
          </Typography>
        </BoxStyled>
    )
}
