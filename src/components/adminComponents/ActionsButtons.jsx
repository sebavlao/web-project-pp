import { useContext, useEffect, useState } from "react"
import AdminModal from "./AdminModal";
import { Box, Typography } from "@mui/material";
import variablesCSS from "../../styles/adminStyles/variablescss";
import endpoints from "../../data/adminData/api";
import { AuthAdminContext } from "../../hooks/adminHooks/useAuth";

export default function ActionsButtons({ type, id }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
                <AdminModal logo={<img src="./../../../admin/pencil.png" alt="" />}>{ type === "user" ? <ModalEditUser id={id} /> : ""}</AdminModal>
                <AdminModal logo={<img src="./../../../admin/desactiveuser.png" alt="" />}>{ type === "user" ? <ModalDeleteUser id={id} /> : ""}</AdminModal>
        </div>
    )
}

export function ModalEditUser({ id }) {
    const { token } = useContext(AuthAdminContext);
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [form, setForm] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            let res = await fetch(endpoints.users + id, {
                headers: {
                    "x-access-token": token
                }
            })
            let json = await res.json();
            console.log(json)
            setUser(json)
            setLoaded(true);
        }

        getUserInfo();
    }, [])

    function handleInput(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await fetch(endpoints.users + id, {
             method: "PUT",
             headers: {
                 "content-type": "application/json",
                 "x-access-token": token
             },
             body: JSON.stringify(form)
         })
         let json = await res.json();
         window.location.reload();
    }

    function handleDate(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
        
            <Box sx={style}>
                {loaded ? (
                    <form onSubmit={handleSubmit}>
                        <TextFieldForm label={'Nombre de usuario'} name={'username'} defaultValue={user.username} onChange={handleInput}></TextFieldForm>
                        <TextFieldForm label={'Email'} name={'email'} defaultValue={user.email} onChange={handleInput}></TextFieldForm>
                        <label htmlFor="userType">Tipo de usuario</label>
                        <select name="userType" defaultValue={user.userType} style={{color: 'black'}} onChange={handleInput}>
                            <option value={'client'} style={{color: 'black'}}>Client</option>
                            <option value={'worker'} style={{color: 'black'}}>Worker</option>
                        </select>
                        <TextFieldForm label={'Nombre'} name={'name'} defaultValue={user.name} onChange={handleInput}></TextFieldForm>
                        <TextFieldForm label={'Apellido'} name={'surname'} defaultValue={user.surname} onChange={handleInput}></TextFieldForm>
                        <input type="date" name={'birthdate'} onChange={handleDate} style={{color: 'black'}} defaultValue={user.birthdate.split('T')[0]} />
                        <br />
                        <input type="submit" />
                    </form>
                ) : (
                    <p>Cargando...</p>
                )}
            </Box>
          </Typography>
        </Box>
    )
}

function TextFieldForm ({label, name, defaultValue, onChange}) {
    return (
        <div>
            <label htmlFor={name} style={{color: 'white'}}>{label}</label>
            <br />
            <input type="text" name={name} defaultValue={defaultValue} onChange={onChange} style={{color: 'black'}} />
            <br /><br />
        </div>
    )
}


export function ModalDeleteUser({ id }) {
    const [confirm, setConfirm] = useState(false);
    const { token } = useContext(AuthAdminContext);

    const banUser = async () => {
        let res = await fetch(endpoints.users + id, {
            method: "PATCH",
            headers: {
                'x-access-token': token
            }
        });

        let json = await res.json();
        console.log(json);
        setConfirm(false);
        window.location.reload();
    };

    useEffect(() => {
        if (confirm) banUser();
    }, [confirm]);


    return (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Seguro que deseas banear a este usuario?
          </Typography>
          <button onClick={banUser}>Aceptar</button>
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


