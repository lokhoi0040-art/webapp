const express = require("express");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

// middleware đọc JSON
app.use(express.json());

// route chính
app.use("/api/documents", documentRoutes);

// test server
app.get("/", (req, res) => {
    res.send("API đang chạy 🚀");
});

// chạy server
app.listen(3000, () => {
    console.log("Server chạy tại: http://localhost:3000");
});