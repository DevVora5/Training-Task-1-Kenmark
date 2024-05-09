// Importing necessary modules from express-validator
const { body, validationResult, param } = require("express-validator");
const jwt = require("jsonwebtoken");
const Comment = require("../models/comments");
const User = require("../models/users")

// Exported updateComment validation middleware
exports.updateCommentValidator = [
    // Validation for the 'id' parameter: must not be empty and must be an integer
    param("id").not().isEmpty().isInt(),
    // Custom validation to check if the user is the post author or the comment author
    async (req, res, next) => {
        try {
            // Extract token from Authorization header
            const token = req.headers.authorization;
            console.log(token)
            if (!token) {
                return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
            }
            // Verify the token using the JWT secret key
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded)

            // Get the user ID from the decoded token
            const email = decoded.email;
            
            // Find the user in the database based on the email
            const user = await User.findOne({ where: { email } });

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ errors: [{ msg: "User not found" }] });
            }

            // Get the user ID
            const userId = user.id;

            console.log(userId)
            // Find the comment in the database based on the provided ID
            const comment = await Comment.findByPk(req.params.id);

            // Check if the comment exists
            if (!comment) {
                return res.status(404).json({ errors: [{ msg: "Comment not found" }] });
            }

            // Check if the user is the post author or the comment author
            if (userId !== comment.userId && userId !== comment.post.authorId) {
                return res.status(403).json({ errors: [{ msg: "Unauthorized to update comment" }] });
            }

            // If the user is authorized, proceed to the next middleware or route handler
            next();
        } catch (error) {
            // Handle any errors and return a 500 status with the error message
            console.error("Error verifying token:", error);
            return res.status(500).json({ errors: [{ msg: "Internal server error" }] });
        }
    },
    // Validation for the 'content' field: must not be empty (optional)
    body("content").not().isEmpty().withMessage("Content cannot be empty").optional(),
    (req, res, next) => {
        // Get validation errors from the request
        const errors = validationResult(req);

        // If there are errors, return a 400 status with the error messages
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // If there are no errors, proceed to the next middleware or route handler
        next();
    }
];
