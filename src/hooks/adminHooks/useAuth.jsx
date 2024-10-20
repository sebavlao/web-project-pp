import { useState, useEffect, createContext } from "react";

export const AuthAdminContext = createContext();

export default function AuthAdminProvider({ children }) {
    const [token, setToken] = useState(getInitialToken);
    const [role, setRole] = useState(getInitialRole);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    useEffect(() => {
        sessionStorage.setItem('role', JSON.stringify(role))
    }, [role])

    function getInitialToken() {
        const token = sessionStorage.getItem('token');
        return token ? JSON.parse(token) : false;
    };

    function getInitialRole() {
        const role = sessionStorage.getItem('role')
        return role ? JSON.parse(role) : false;
    }

    return (
        <AuthAdminContext.Provider value={
            {
                token,
                setToken,
                role,
                setRole,
                reload,
                setReload
            }
        }>
            {children}
        </AuthAdminContext.Provider>
    )
}

