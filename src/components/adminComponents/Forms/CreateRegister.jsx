import { useContext, useState } from "react";
import BoxStyled from "../Box";
import { AuthAdminContext } from "../../../hooks/adminHooks/useAuth";

export default function FormCreate({ properties, endpoint, token }) {
    const [form, setForm] = useState({});
    const { reload, setReload } = useContext(AuthAdminContext)

    const createRegister = async (e) => {
        e.preventDefault();
        let res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify(form)
        })
        setReload(!reload)
    }

    const handleInput = (e) => {
        setForm({...form, 
            [e.target.name]: e.target.value
        })
    }

    const Inputs = 
        properties.map(el => {
            return (
                <div key={el}>  
                    <label htmlFor={el}>{el}</label>
                    <input onChange={handleInput} style={{color: 'black'}} type="text" placeholder={`Ingresar ${el}`} name={el} />
                </div>

            )
        })
    

    return (
        <BoxStyled>         
            <form onSubmit={createRegister}>
                {Inputs}
                <input type="submit" value={'Enviar'} />
            </form>
        </BoxStyled>
    )
}