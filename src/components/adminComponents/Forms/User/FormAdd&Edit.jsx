import { TextFieldForm } from "../TextFieldForm";
import { useState, useContext } from "react";
import { AuthAdminContext } from "../../../../hooks/adminHooks/useAuth";
import endpoints from "../../../../data/adminData/api";
import InputPassword from "../../InputPassword";

export function FormUser({ endpoint, method, user = null }) {
    const { token, reload, setReload } = useContext(AuthAdminContext);
    const [form, setForm] = useState({});

    function handleInput(e) {
        console.log(e.target)
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await fetch(endpoint, {
             method: method,
             headers: {
                 "content-type": "application/json",
                 "x-access-token": token
             },
             body: JSON.stringify(form)
         })
         let json = await res.json();
         setReload(!reload)
    }

    function handleDate(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }


    return (
        <form onSubmit={handleSubmit}>
            <TextFieldForm label={'Nombre de usuario'} name={'username'} defaultValue={!user ? "" : user.username} onChange={handleInput}></TextFieldForm>
            <TextFieldForm label={'Email'} name={'email'} defaultValue={!user ? "" : user.email} onChange={handleInput}></TextFieldForm>
            { endpoint == endpoints.users ? (
                <TextFieldForm label={'Contraseña'} name={'password'} onChange={handleInput} />
            ) : ""}
            <label htmlFor="userType">Tipo de usuario</label>
            <select name="userType" defaultValue={!user ? " " : user.userType} style={{color: 'black'}} onChange={handleInput}>
                { !user ? 
                <option value={" "} disabled></option> : "" }
                <option value={'client'} style={{color: 'black'}}>Client</option>
                <option value={'worker'} style={{color: 'black'}}>Worker</option>
            </select>
            <TextFieldForm label={'Nombre'} name={'name'} defaultValue={!user ? "" : user.name} onChange={handleInput}></TextFieldForm>
            <TextFieldForm label={'Apellido'} name={'surname'} defaultValue={!user ? "" : user.surname} onChange={handleInput}></TextFieldForm>
            <input type="date" name={'birthdate'} onChange={handleDate} style={{color: 'black'}} defaultValue={!user ? "" : user.birthdate.split('T')[0]} />
            <br />
            <input type="submit" />
        </form>
    )
}