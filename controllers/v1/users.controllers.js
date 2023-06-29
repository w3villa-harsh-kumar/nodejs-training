const { StatusCodes } = require("http-status-codes");
const { BadRequestError, AnonmyousError } = require("../../errors");
const { getValueFromCache, setValueInCache } = require("../../helpers");
const User = require("../../models").User;

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

            // set token in cache
            setValueInCache(`${newUser.id}`, {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            });

            // commit transaction
            await transaction.commit();

            // send response
            res.status(StatusCodes.CREATED).json({
                success: true,
                token,
                msg: "User created successfully",
            });
        } catch (error) {
            await transaction.rollback();
            return next(error);
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
                throw new BadRequestError("Invalid credentials");
            }

            // generate auth token
            const token = await user.generateAuthToken();

            // commit transaction
            await transaction.commit();

            // send response
            res.status(StatusCodes.OK).json({
                success: true,
                token,
                msg: "User logged in successfully",
            });
        } catch (error) {
            await transaction.rollback();
            return next(error);
        }
    },

    getUserProfile: async (req, res, next) => {
        // create a transaction
        const transaction = await User.sequelize.transaction();
        try {
            // get user profile
            let user = await getValueFromCache(`${req.user.id}`);
            if (!user) {
                user = await User.findByPk(req.user.id, {
                    attributes: ["id", "name", "email"],
                });
                if (!user) {
                    throw new AnonmyousError("User not found");
                }
                setValueInCache(`${req.user.id}`, user);
            } else {
                transaction.commit();
                return res.status(StatusCodes.OK).json({
                    success: true,
                    user,
                    msg: "User profile fetched successfully",
                });
            }

            // if user not found
            if (!user) {
                throw new AnonmyousError("User not found");
            }

            // commit transaction
            await transaction.commit();

            // send response
            res.status(StatusCodes.OK).json({
                success: true,
                user,
                msg: "User profile fetched successfully",
            });
        } catch (error) {
            await transaction.rollback();
            return next(error);
        }
    },
};
