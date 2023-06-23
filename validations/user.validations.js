const Joi = require("joi");

module.exports = {
    registerValidations: Joi.object({
        name: Joi.string().min(3).max(30).required().messages({
            "string.base": `Name should be a type of 'text'`,
            "string.empty": `Name cannot be an empty field`,
            "string.min": `Name should have a minimum length of {#limit}`,
            "string.max": `Name should have a maximum length of {#limit}`,
            "any.required": `Name is a required field`,
        }),
        email: Joi.string().email().required().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format is invalid`,
            "any.required": `Email is a required field`,
        }),
        password: Joi.string().min(6).max(30).required().messages({
            "string.base": `Password should be a type of 'text'`,
            "string.empty": `Password cannot be an empty field`,
            "string.min": `Password should have a minimum length of {#limit}`,
            "string.max": `Password should have a maximum length of {#limit}`,
            "any.required": `Password is a required field`,
        }),
        phoneNumber: Joi.string().min(10).max(10).required().messages({
            "string.base": `Phone Number should be a type of 'text'`,
            "string.empty": `Phone Number cannot be an empty field`,
            "string.min": `Phone Number should have a minimum length of {#limit}`,
            "string.max": `Phone Number should have a maximum length of {#limit}`,
            "any.required": `Phone Number is a required field`,
        }),
    }),
    loginValidations: Joi.object({
        email: Joi.string().email().required().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format is invalid`,
            "any.required": `Email is a required field`,
        }),
        password: Joi.string().min(6).max(30).required().messages({
            "string.base": `Password should be a type of 'text'`,
            "string.empty": `Password cannot be an empty field`,
            "string.min": `Password should have a minimum length of {#limit}`,
            "string.max": `Password should have a maximum length of {#limit}`,
            "any.required": `Password is a required field`,
        }),
    }),
};
