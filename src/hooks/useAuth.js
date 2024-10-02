import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_USER } from "../api/api";

export const useAuth = () => {
  const {auth, setAuth} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (form) => {
    setLoading(true);
    setError(null);

    try {
      const res = await API_USER.post("/", form);

      if (res.data && res.data.token) {
        localStorage.setItem("x-access-token", res.data.token);
        setAuth(true)
        return { success: true, role: res.data.role };
      } else {
        throw new Error("Server Error");
      }
    } catch (err) {
      setError(err.response?.data?.message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("x-access-token");
    setAuth(false)
  };

  return { login, logout, auth, loading, error };
};
