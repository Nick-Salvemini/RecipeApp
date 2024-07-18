const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const { NotFoundError } = require("./expressError");
const db = require("./database/db");

// Import routers
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

// Import middleware
const { authenticateJWT } = require("./middleware/auth");

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/recipes", authenticateJWT, recipeRoutes);

// If no route is matched, assume 404 (Not Found)
app.use((req, res, next) => {
    throw new NotFoundError();
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message || 'Something went wrong.',
            status: err.status
        }
    });
});

// Connect to the database and start the server
db.connect().then(() => {
    console.log("Database connected successfully");
    // app.listen(PORT, () => {
    //     console.log(`Server running on port ${PORT}`);
    // });
}).catch(err => {
    console.error("Database connection failed", err.stack);
});

module.exports = app;