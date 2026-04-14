require("dotenv").config();

const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ chỉ 1 lần
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

// ✅ BẮT BUỘC dùng PORT của Railway
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});