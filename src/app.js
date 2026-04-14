require("dotenv").config();

const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

// ✅ FIX CORS
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ROUTES
app.use("/api/documents", documentRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

// PORT (Railway bắt buộc phải có fallback)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port " + PORT);
});