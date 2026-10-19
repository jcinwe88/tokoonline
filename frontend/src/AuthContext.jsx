import { createContext, useContext, useState } from "react";
import api from "./api.js";
import { trackEvent } from "./analytics.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const simpanSesi = (data) => {
    localStorage.setItem("token", data.token); // token JWT disimpan di localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    simpanSesi(res.data);
    trackEvent("login");
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    simpanSesi(res.data);
    trackEvent("sign_up");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    trackEvent("logout");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
