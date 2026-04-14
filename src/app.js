require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// ✅ CORS (fix dứt điểm)
app.use(cors({
  origin: "*",
}));

// middleware
app.use(express.json());

// routes
app.use("/api/documents", documentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

// ✅ kiểm tra DB (không crash app)
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ DB connected");
    conn.release();
  } catch (err) {
    console.error("❌ DB error:", err.message);
  }
})();

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});