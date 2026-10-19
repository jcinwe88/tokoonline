import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate("/products", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Registrasi</h1>
      {error && <p className="error">{error}</p>}
      <input type="text" placeholder="Nama" required value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" required value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password (min. 6 karakter)" required value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="btn" type="submit">Daftar</button>
      <p>Sudah punya akun? <Link to="/login">Login</Link></p>
    </form>
  );
}
