const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const router = express.Router();

// Catatan: Create, Update, Delete wajib login (token JWT). Read tetap publik.
// CREATE  -> POST /api/products
router.post("/", auth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL -> GET /api/products
router.get("/", async (req, res) => {
  try {
    res.json(await Product.find().sort({ createdAt: -1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE -> GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "ID tidak valid" });
  }
});

// UPDATE -> PUT /api/products/:id
router.put("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE -> DELETE /api/products/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(400).json({ message: "ID tidak valid" });
  }
});

module.exports = router;
