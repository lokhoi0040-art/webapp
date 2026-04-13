const express = require("express");
const cors = require("cors");

const documentRoutes = require("./routes/documentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/documents", documentRoutes);

// Test API
app.get("/", (req, res) => {
    res.send("API is running");
});

// Global error handler (QUAN TRỌNG)
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});