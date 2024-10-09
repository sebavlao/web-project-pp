import { TextFieldForm } from "../TextFieldForm";
import { useState, useContext } from "react";
import { AuthAdminContext } from "../../../../hooks/adminHooks/useAuth";
import endpoints from "../../../../data/adminData/api";

export function FormEditJob({ job }) {
    const { token } = useContext(AuthAdminContext);
    const [form, setForm] = useState({});

    function handleInput(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await fetch(endpoints.jobs + job._id, {
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
            <TextFieldForm label={'Titulo'} name={'title'} defaultValue={job.title} onChange={handleInput}></TextFieldForm>
            <TextFieldForm label={'Descripcion'} name={'description'} defaultValue={job.description} onChange={handleInput}></TextFieldForm>
            <br />
            <input type="submit" />
        </form>
    )
}