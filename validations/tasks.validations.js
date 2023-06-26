const Joi = require("joi");

module.exports = {
    createTaskValidations: Joi.object({
        title: Joi.string().min(3).max(30).required().messages({
            "string.base": `Title should be a type of 'text'`,
            "string.empty": `Title cannot be an empty field`,
            "string.min": `Title should have a minimum length of {#limit}`,
            "string.max": `Title should have a maximum length of {#limit}`,
            "any.required": `Title is a required field`,
        }),
        description: Joi.string().min(3).max(100).required().messages({
            "string.base": `Description should be a type of 'text'`,
            "string.empty": `Description cannot be an empty field`,
            "string.min": `Description should have a minimum length of {#limit}`,
            "string.max": `Description should have a maximum length of {#limit}`,
            "any.required": `Description is a required field`,
        }),
        status: Joi.string()
            .valid("pending", "ongoing", "completed")
            .messages({
                "string.base": `Status should be a type of 'text'`,
                "string.empty": `Status cannot be an empty field`,
                "string.valid": `Status should be either 'pending', 'ongoing' or 'completed'`,
                "any.required": `Status is a required field`,
            }),
    }),
    updateTaskValidations: Joi.object({
        title: Joi.string().min(3).max(30).messages({
            "string.base": `Title should be a type of 'text'`,
            "string.empty": `Title cannot be an empty field`,
            "string.min": `Title should have a minimum length of {#limit}`,
            "string.max": `Title should have a maximum length of {#limit}`,
            "any.required": `Title is a required field`,
        }),
        description: Joi.string().min(3).max(100).messages({
            "string.base": `Description should be a type of 'text'`,
            "string.empty": `Description cannot be an empty field`,
            "string.min": `Description should have a minimum length of {#limit}`,
            "string.max": `Description should have a maximum length of {#limit}`,
            "any.required": `Description is a required field`,
        }),
        status: Joi.string().valid("pending", "ongoing", "completed").messages({
            "string.base": `Status should be a type of 'text'`,
            "string.empty": `Status cannot be an empty field`,
            "string.valid": `Status should be either 'pending', 'ongoing' or 'completed'`,
        }),
    }),
};
