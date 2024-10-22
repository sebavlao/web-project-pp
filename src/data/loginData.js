export const loginData = {
    initialValues: ["username", "password"],
    inputs: [
        {
            label: "Usuario",
            input: {
                type: "text",
                name: "username",
                placeholder: "Escribe el username registrado",
                autoComplete: ""
            }
        },
        {
            label: "Contraseña",
            input: {
            type: "password",
            name: "password",
            placeholder: "Escribe tu contraseña",
            autoComplete: "current-password"
            }
        }
    ]
}