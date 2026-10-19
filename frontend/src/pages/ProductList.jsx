import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";

export const rupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Gagal mengambil data dari backend."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Memuat produk...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <h1>Daftar Produk</h1>
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{rupiah(p.price)}</p>
            <Link to={`/products/${p._id}`} className="btn">Detail</Link>
          </div>
        ))}
      </div>
    </>
  );
}
