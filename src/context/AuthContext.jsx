import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false)

    console.log(auth)

    useEffect(() => {
        if (localStorage.getItem("x-access-token")) {
            setAuth(localStorage.getItem("x-access-token"))
        }
    }, [localStorage.getItem("x-access-token")])

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}