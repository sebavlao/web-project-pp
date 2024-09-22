import { Input } from "../Input"
import { login } from "../../data/login"
import { Button } from "../Button"
import { useLogin } from "../../hooks/useLogin"
import { useNavigate } from "react-router-dom"

export const LoginSection = ({ title }) => {
    const { buttonState, setButtonState, sendLogin, inputsHandle } = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        setButtonState(true)
        const result = await sendLogin()

        if (result.success) {
            localStorage.setItem("x-acess-token", result.data.token)
            return navigate("/dashboard")
        }

        setButtonState(false)

        // se podría agregar manejo de errores, el error se guarda en result.error
    }

    return (
        <section>
            <form
                onSubmit={handleSubmit} 
                className="bg-zinc-800 px-10 min-h-[400px] py-10 text-white flex text-xl flex-col justify-between rounded-xl gap-5"
            >
                <h1 className="flex justify-center font-bold text-3xl">{title}</h1>
                <ul className="grid grid-cols-1 gap-4">
                    {login.inputs.map((input, index) => (
                        <Input handle={inputsHandle} key={`input-${index}`} labelName={input.label} {...input.input}/>
                    ))}
                </ul>
                <Button disabledState={buttonState} title="Loguearse"/>
            </form>
        </section>
    )
}