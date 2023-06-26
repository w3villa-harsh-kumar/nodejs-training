require("dotenv").config();
require("express-async-errors");

// Database connection
const db = require("./db/db.connect");

// Logger
const logger = require("./loggers");
const httpLogger = require("./loggers/httpLogger");

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
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

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
        logger.info("Database connected successfully");
        app.listen(PORT, () => {
            logger.info(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        logger.error("Unable to connect to the database:", error);
        process.exit(1);
    });

module.exports = app;
