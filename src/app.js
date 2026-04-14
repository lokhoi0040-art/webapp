require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
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

// ❗ QUAN TRỌNG: bind 0.0.0.0 cho Railway
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port " + PORT);
});

// debug ENV
console.log("MYSQL_URL:", process.env.MYSQL_URL);
