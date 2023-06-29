const { StatusCodes } = require("http-status-codes");
const Task = require("../../models").Task;
const { BadRequestError, NotFoundError } = require("../../errors");
const { getValueFromCache, setValueInCache } = require("../../helpers");

module.exports = {
    createTask: async (req, res, next) => {
        // create a transaction
        const transaction = await Task.sequelize.transaction();
        try {
            // create new task
            const task = await Task.create({
                ...req.body,
                userId: req.user.id,
            });

            // if task not created
            if (!task) {
                throw new BadRequestError("Task not created");
            }

            // set cache
            await setValueInCache(`task-${task.id}`, task);
            const tasks = await Task.findAll({
                where: {
                    userId: req.user.id,
                },
                include: [
                    {
                        association: "user",
                        attributes: ["id", "name", "email"],
                    },
                ],
            });
            await setValueInCache(`tasks-${req.user.id}`, tasks);

            // commit transaction
            await transaction.commit();

            // send response
            res.status(StatusCodes.CREATED).json({
                success: true,
                task,
                msg: "Task created successfully",
            });
        } catch (error) {
            // rollback transaction
            await transaction.rollback();
            return next(error);
        }
    },

    getAllTasks: async (req, res, next) => {
        // create a transaction
        const transaction = await Task.sequelize.transaction();
        try {
            // get all tasks of a user
            let tasks = await getValueFromCache(`tasks-${req.user.id}`);
            if (!tasks) {
                tasks = await Task.findAll({
                    where: {
                        userId: req.user.id,
                    },
                    include: [
                        {
                            association: "user",
                            attributes: ["id", "name", "email"],
                        },
                    ],
                });
                await setValueInCache(`tasks-${req.user.id}`, tasks);
            }

            // commit transaction
            await transaction.commit();

            // send response
            res.status(StatusCodes.OK).json({
                success: true,
                tasks,
                msg: "Tasks fetched successfully",
            });
        } catch (error) {
            // rollback transaction
            await transaction.rollback();
            return next(error);
        }
    },

    getTaskById: async (req, res, next) => {
        // create a transaction
        const transaction = await Task.sequelize.transaction();
        try {
            // get task by id of a user
            let task = await getValueFromCache(`task-${req.params.id}`);
            if (!task) {
                task = await Task.findOne({
                    where: {
                        id: req.params.id,
                        userId: req.user.id,
                    },
                    include: [
                        {
                            association: "user",
                            attributes: ["id", "name", "email"],
                        },
                    ],
                });
                await setValueInCache(`task-${req.params.id}`, task);
            }

            // if task not found
            if (!task) {
                throw new NotFoundError("Task not found");
            }

            // commit transaction
            res.status(StatusCodes.OK).json({
                success: true,
                task,
                msg: "Task fetched successfully",
            });
        } catch (error) {
            // rollback transaction
            await transaction.rollback();
            return next(error);
        }
    },

    updateTask: async (req, res, next) => {
        // create a transaction
        const transaction = await Task.sequelize.transaction();
        try {
            // get task by id of a user
            const task = await Task.findOne({
                where: {
                    id: req.params.id,
                    userId: req.user.id,
                },
            });

            // if task not found
            if (!task) {
                throw new NotFoundError("Task not found");
            }

            // update task
            await task.update(req.body);

            // commit transaction
            transaction.commit();

            // send response
            res.status(StatusCodes.OK).json({
                success: true,
                task,
                msg: "Task updated successfully",
            });
        } catch (error) {
            // rollback transaction
            await transaction.rollback();
            return next(error);
        }
    },

    deleteTask: async (req, res, next) => {
        // create a transaction
        const transaction = await Task.sequelize.transaction();
        try {
            // get task by id of a user
            const task = await Task.findOne({
                where: {
                    id: req.params.id,
                    userId: req.user.id,
                },
            });

            // if task not found
            if (!task) {
                throw new NotFoundError("Task not found");
            }

            // delete task
            await task.destroy();

            // commit transaction
            transaction.commit();

            // send response
            res.status(StatusCodes.OK).json({
                success: true,
                msg: "Task deleted successfully",
            });
        } catch (error) {
            // rollback transaction
            await transaction.rollback();
            return next(error);
        }
    },
};
