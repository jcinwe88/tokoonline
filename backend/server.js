require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
// CLIENT_URL diisi URL frontend saat deploy; jika kosong, semua origin diizinkan
app.use(cors(process.env.CLIENT_URL ? { origin: process.env.CLIENT_URL } : {}));
app.use(express.json());

app.get("/", (req, res) => res.send("API Toko Online berjalan"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB terhubung");
    app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
  })
  .catch((err) => console.error("Gagal konek MongoDB:", err.message));
