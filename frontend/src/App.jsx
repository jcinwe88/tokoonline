import { useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./AuthContext.jsx";
import { trackPageView } from "./analytics.js";

export default function App() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Kirim page view ke Google Analytics setiap pindah halaman
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar">
        <h2>Toko Online</h2>
        <div className="links">
          <Link to="/">Beranda</Link>
          <Link to="/products">Produk</Link>
          {user ? (
            <>
              <span>Hai, {user.name}</span>
              <a href="#" onClick={(e) => { e.preventDefault(); logout(); navigate("/"); }}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Daftar</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Route terproteksi: wajib login */}
          <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        </Routes>
      </main>

      <footer className="footer">© 2025 Toko Online - Tugas Lab Week 8</footer>
    </>
  );
}
