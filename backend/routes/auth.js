const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

const buatToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// REGISTRASI -> POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Nama, email, dan password wajib diisi" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password minimal 6 karakter" });

    const sudahAda = await User.findOne({ email: email.toLowerCase() });
    if (sudahAda) return res.status(400).json({ message: "Email sudah terdaftar" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.status(201).json({ token: buatToken(user), user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN -> POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user || !(await bcrypt.compare(password || "", user.password)))
      return res.status(401).json({ message: "Email atau password salah" });

    res.json({ token: buatToken(user), user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CEK PROFIL (route terproteksi) -> GET /api/auth/me
router.get("/me", auth, (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
});

module.exports = router;
