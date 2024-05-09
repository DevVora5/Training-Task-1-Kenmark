// Importing necessary modules from express-validator
const { body, validationResult } = require("express-validator");

// Exported login validation middleware
exports.loginValidator = [
    // Validation for the 'email' field: must be a valid email format
    body("email").isEmail().withMessage("Email format incorrect"),
    // Validation for the 'password' field: must be a string with a minimum length of 3 characters, and not empty
    body("password").isString().isLength({ min: 3 }).not().isEmpty(),
    // Middleware function to handle validation results
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
