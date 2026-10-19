const jwt = require("jsonwebtoken");

// Middleware: memeriksa token JWT pada header "Authorization: Bearer <token>"
module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Token tidak ditemukan, silakan login" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid atau kedaluwarsa" });
  }
};
