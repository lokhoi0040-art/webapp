require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// CORS
app.use(cors({ origin: "*" }));

// middleware
app.use(express.json());

// routes
app.use("/api/documents", documentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

// ✅ FIX DB CHECK (KHÔNG crash nữa)
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ DB connected");
  } catch (err) {
    console.error("❌ DB error:", err.message);
  }
})();

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});