import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await API.get("/auth/me");

      setUser(data.user);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    setUser(data.user);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

return data.user;
  };

  // Register
  const register = async (name, email, password) => {
    await API.post("/auth/register", {
      name,
      email,
      password,
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;