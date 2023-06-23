const { register, login } = require("../controllers/v1/users.controllers");
const {
    registerValidations,
    loginValidations,
} = require("../validations/user.validations");

const validator = require("../middlewares/validator");

const Router = require('express').Router;

const router = Router();

router.post("/register", validator(registerValidations, "body"), register);
router.post("/login", validator(loginValidations, "body"), login);

module.exports = router;