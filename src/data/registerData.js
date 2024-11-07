export const registerData = {
    initialValues: ["name", "surname", "email", "username", "password", "birthdate"],
    inputs: [
        {
            label: "Nombre",
            input: {
              type: "text",
              name: "name",
              placeholder: "Escribe tu nombre",
              autoComplete: "given-name"
            }
        },
        {
            label: "Apellido",
            input: {
                type: "text",
                name: "surname",
                placeholder: "Escribe tu apellido",
                autoComplete: "family-name"
            }
        },
        {
            label: "Email",
            input: {
            type: "email",
            name: "email",
            placeholder: "Escribe tu email",
            autoComplete: "email"
            } 
        },
        {
            label: "Nombre de usuario",
            input: {
                type: "text",
                name: "username",
                placeholder: "Escribe el nombre de usuario a utilizar",
            }
        },
        {
            label: "Contraseña",
            input: {
                type: "password",
                name: "password",
                placeholder: "Escribe una contraseña fuerte",
                autoComplete: "new-password"
            }
        },
        {
            label: "Fecha de nacimiento",
            input: {
                type: "date",
                name: "birthdate",
                placeholder: "Escribe tu fecha de nacimiento",
                autoComplete: "bday"
            }
        }
    ]
}