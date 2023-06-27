const { Transaction } = require("sequelize");
const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const logger = require("../loggers");

const errorHandlerMiddleware = (error, req, res, next) => {
    logger.error(error);
    logger.error(error.stack);
    // if error is a custom error
    if (error instanceof CustomAPIError) {
        return res
            .status(error.statusCode)
            .json({ msg: error.message, success: false });
    }

    // send generic message
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Something went wrong, please try again",
        success: false,
    });
};

module.exports = errorHandlerMiddleware;
