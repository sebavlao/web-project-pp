import { TextFieldForm } from "../TextFieldForm";
import { useState, useContext } from "react";
import { AuthAdminContext } from "../../../../hooks/adminHooks/useAuth";
import endpoints from "../../../../data/adminData/api";

export function FormEditAdmin({ admin }) {
    const { token } = useContext(AuthAdminContext);
    const [form, setForm] = useState({});

    function handleInput(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await fetch(endpoints.admins + admin._id, {
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

    return (
        <form onSubmit={handleSubmit}>
            <TextFieldForm label={'Nombre de usuario'} name={'username'} defaultValue={admin.username} onChange={handleInput}></TextFieldForm>
            <label htmlFor="userType">Tipo de usuario</label>
            <select name="userType" defaultValue={admin.userType} style={{color: 'black'}} onChange={handleInput}>
                <option value={'admin'} style={{color: 'black'}}>Admin</option>
                <option value={'superadmin'} style={{color: 'black'}}>Superadmin</option>
            </select>
            <br />
            <input type="submit" />
        </form>
    )
}