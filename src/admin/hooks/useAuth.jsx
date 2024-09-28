import { useState, useEffect, createContext } from "react";

export const AuthAdminContext = createContext();

export default function AuthAdminProvider({ children }) {
    const [token, setToken] = useState(getInitialState);

    useEffect(() => {
        sessionStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    function getInitialState() {
        const token = sessionStorage.getItem('token');
        return token ? JSON.parse(token) : false;
    };

    return (
        <AuthAdminContext.Provider value={
            {
                token,
                setToken
            }
        }>
            {children}
        </AuthAdminContext.Provider>
    )
}

