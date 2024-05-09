// Importing necessary modules from express-validator
const { param } = require("express-validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/posts");
const User = require("../models/users");

// Exported deletePost validation middleware
exports.deletePostValidator = [
    // Validation for the 'id' parameter: must not be empty and must be an integer
    param("id").not().isEmpty().isInt(),
    // Custom validation to check if the user is the post author
    async (req, res, next) => {
        try {
            // Extract token from Authorization header
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
            }

            // Verify the token using the JWT secret key
            const decoded = jwt.verify(token, process.env.SECRET);

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
            // Find the post in the database based on the provided ID
            const post = await Post.findByPk(req.params.id);

            
            console.log(post.authorId)
            // Check if the post exists
            if (!post) {
                return res.status(404).json({ errors: [{ msg: "Post not found" }] });
            }

            // Check if the user is the post author
            if (userId !== post.authorId) {
                return res.status(403).json({ errors: [{ msg: "Unauthorized to delete post" }] });
            }

            // If the user is authorized, proceed to the next middleware or route handler
            next();
        } catch (error) {
            // Handle any errors and return a 500 status with the error message
            console.error("Error verifying token:", error);
            return res.status(500).json({ errors: [{ msg: "Internal server error" }] });
        }
    }
];
