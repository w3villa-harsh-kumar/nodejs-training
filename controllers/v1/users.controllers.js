const { StatusCodes } = require("http-status-codes");
const { BadRequestError, AnonmyousError } = require("../../errors");
const User = require("../../models/user.model");

module.exports = {
    register: async (req, res, next) => {
        // create a transaction
        const transaction = await User.sequelize.transaction();
        try {
            // check if user already exists
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (user) {
                throw new BadRequestError("User already exists");
            }

            // create new user
            const newUser = await User.create(req.body, { transaction });

            // generate auth token
            const token = await newUser.generateAuthToken();

            // commit transaction
            await transaction.commit();

            // send response
            res.status(201).json({
                success: true,
                token,
                msg: "User created successfully",
            });
        } catch (error) {
            await transaction.rollback();
            throw new AnonmyousError(
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    login: async (req, res, next) => {
        // create a transaction
        const transaction = await User.sequelize.transaction();
        try {
            // check if user already exists
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email,
                },
            });

            // check if user exists and password is correct
            if (!user || !(await user.matchPassword(password))) {
                throw new BadRequestError("Invalid email or password");
            }

            // generate auth token
            const token = await user.generateAuthTokn();

            // commit transaction
            await transaction.commit();

            // send response
            res.status(200).json({
                success: true,
                token,
                msg: "User logged in successfully",
            });
        } catch (error) {
            await transaction.rollback();
            throw new AnonmyousError(
                error.message,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },
};
