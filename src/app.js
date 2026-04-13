const express = require("express");
const cors = require("cors");
const path = require("path");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// cho phép truy cập file trong thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/documents", documentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});