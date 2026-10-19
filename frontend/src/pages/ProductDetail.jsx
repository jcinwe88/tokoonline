import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api.js";
import { rupiah } from "./ProductList.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Produk tidak ditemukan."));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Memuat...</p>;

  return (
    <div className="detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p className="price">{rupiah(product.price)}</p>
        <p>{product.description}</p>
        <p>Stok: {product.stock}</p>
        <Link to="/products" className="btn">← Kembali</Link>
      </div>
    </div>
  );
}
