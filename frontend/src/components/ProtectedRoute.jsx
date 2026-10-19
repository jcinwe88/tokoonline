import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

// Halaman di dalam komponen ini hanya bisa dibuka jika sudah login
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}
