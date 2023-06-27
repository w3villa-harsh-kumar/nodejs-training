require("dotenv").config();
require("express-async-errors");

// security
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

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

const express = require("express");
const { AnonmyousError } = require("./errors");
const { StatusCodes } = require("http-status-codes");
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
const limiter = rateLimit({
    windowMs: 15 * Number(process.env.RATE_LIMIT_WINDOW),
    max: Number(process.env.RATE_LIMIT_MAX),
    standardHeaders: true,
    legacyHeaders: false,
    handler(req, res, next) {
        logger.error(`Too many requests from ${req.ip} at ${req.originalUrl}`);
        throw new AnonmyousError(
            `Too many requests, please try again in ${Math.round(
                this.windowMs / process.env.RATE_LIMIT_WINDOW
            )} minutes`,
            StatusCodes.TOO_MANY_REQUESTS
        );
    },
});
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
};
app.set(
    "trust proxy",
    typeof process.env.TRUST_PROXY === "number" ? process.env.PROXY : 0
);
app.use(limiter);
app.use(cors(corsOptions));
app.use(helmet());
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
