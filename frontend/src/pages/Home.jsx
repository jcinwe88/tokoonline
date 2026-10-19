import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <h1>Selamat Datang di Toko Online</h1>
      <p>Belanja produk pilihan dengan harga terbaik.</p>
      <Link to="/products" className="btn">Lihat Produk</Link>
    </section>
  );
}
