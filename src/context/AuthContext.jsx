import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("x-access-token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Cargando...</div>;

  return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
