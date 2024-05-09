// Importing necessary modules from express-validator
const { body, validationResult, param } = require("express-validator");
const { User } = require("../models/users");

// Exported updateUser validation middleware
exports.updateUserValidator = [
    // Validation for the 'id' parameter: must not be empty and must be an integer
    param("id").not().isEmpty().isInt(),
    // Validation for the 'username' field: must be a string with a minimum length of 3 characters (optional)
    body("username").isString().isLength({ min: 3 }).optional(),
    // Validation for the 'email' field: must be a valid email format (optional)
    body("email").isEmail().withMessage("Email format incorrect").optional(),
    (req, res, next) => {
        // Get validation errors from the request
        const errors = validationResult(req);

        // If there are errors, return a 400 status with the error messages
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        // If there are no errors, proceed to the next middleware or route handler
        next();
    }
];
