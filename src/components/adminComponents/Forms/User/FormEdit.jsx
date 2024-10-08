import { TextFieldForm } from "../TextFieldForm";
import { useState, useContext } from "react";
import { AuthAdminContext } from "../../../../hooks/adminHooks/useAuth";
import endpoints from "../../../../data/adminData/api";

export function FormEditUser({ user }) {
    const { token } = useContext(AuthAdminContext);
    const [form, setForm] = useState({});

    function handleInput(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await fetch(endpoints.users + user._id, {
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
    )
}