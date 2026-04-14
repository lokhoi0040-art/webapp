require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// ✅ CORS chuẩn
const corsOptions = {
  origin: "*", // hoặc "http://127.0.0.1:5500"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 👈 FIX CORS preflight

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

// routes
app.use("/api/documents", documentRoutes);

// test DB khi start
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

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port " + PORT);
});

// debug
console.log("MYSQL_URL:", process.env.MYSQL_URL);