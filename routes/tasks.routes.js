const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/v1/tasks.controllers");

const {
    createTaskValidations,
    updateTaskValidations,
} = require("../validations/tasks.validations");

const validator = require("../middlewares/validator");

const authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

// Task Routes
router.post(
    "/",
    authenticate,
    validator(createTaskValidations, "body"),
    createTask
);
router.get("/", authenticate, getAllTasks);
router.get("/:id", authenticate, getTaskById);
router.patch(
    "/:id",
    authenticate,
    validator(updateTaskValidations, "body"),
    updateTask
);
router.delete("/:id", authenticate, deleteTask);

module.exports = router;
