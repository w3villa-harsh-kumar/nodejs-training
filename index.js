require("dotenv").config();
require("express-async-errors");

// Database connection
const db = require("./db/db.connect");



// error handler
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// Routes
const userRoutes = require("./routes/users.routes");
const taskRoutes = require("./routes/tasks.routes");

const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Error Handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.sync()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
