// Mengisi database dengan data contoh: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const data = [
  { name: "Sepatu Sneakers", price: 350000, stock: 20, image: "https://picsum.photos/seed/sepatu/400/300", description: "Sneakers nyaman untuk sehari-hari." },
  { name: "Tas Ransel", price: 275000, stock: 15, image: "https://picsum.photos/seed/tas/400/300", description: "Tas ransel muat laptop 15 inci." },
  { name: "Jam Tangan", price: 520000, stock: 10, image: "https://picsum.photos/seed/jam/400/300", description: "Jam tangan analog tahan air." },
  { name: "Headphone Wireless", price: 410000, stock: 12, image: "https://picsum.photos/seed/headphone/400/300", description: "Headphone bluetooth dengan bass kuat." },
  { name: "Kaos Polos", price: 85000, stock: 50, image: "https://picsum.photos/seed/kaos/400/300", description: "Kaos katun adem dan lembut." },
  { name: "Botol Minum", price: 65000, stock: 40, image: "https://picsum.photos/seed/botol/400/300", description: "Botol stainless 750 ml." },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany();
  await Product.insertMany(data);
  console.log("Seed selesai:", data.length, "produk");
  process.exit();
})();
