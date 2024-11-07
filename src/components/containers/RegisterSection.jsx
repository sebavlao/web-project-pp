import { Input } from "../Input"
import { registerData } from "../../data/registerData"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"
import { useFormHandle } from "../../hooks/useFormHandle"
import { registerService } from "../../services/registerService"


export const RegisterSection = ({ title, userType }) => {
    const {form, buttonStateDisabled, inputsHandle, setIsLoading} = useFormHandle(registerData.initialValues, userType)
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)
        const result = await registerService(form)

        if (result.success) {
            localStorage.setItem("x-access-token", result.data.token)
            return navigate("/login")
        }
        
        console.error(result.error)
        setIsLoading(false)
    }

    return (
        <section>
            <form
                onSubmit={handleSubmit} 
                className="bg-zinc-800 px-10 min-h-[400px] py-10 text-white flex text-xl flex-col justify-between rounded-xl gap-5"
            >
                <h1 className="flex justify-center font-bold text-3xl">{title}</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {registerData.inputs.map((input, index) => (
                        <Input handle={inputsHandle} key={`input-${index}`} labelName={input.label} {...input.input}/>
                    ))}
                </ul>
                <Button disabledState={buttonStateDisabled} title="Enviar registro"/>
            </form>
        </section>
    )
}