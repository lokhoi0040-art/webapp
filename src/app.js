require("dotenv").config();

const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});