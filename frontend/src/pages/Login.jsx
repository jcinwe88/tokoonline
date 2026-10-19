import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/products", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input type="email" placeholder="Email" required value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" required value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="btn" type="submit">Masuk</button>
      <p>Belum punya akun? <Link to="/register">Daftar</Link></p>
    </form>
  );
}
