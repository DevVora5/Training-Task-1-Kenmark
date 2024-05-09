// Importing necessary modules and functions
const { connect } = require("../dbconfig");
const  Comment  = require("../models/comments");

// Exported controller object for handling comment-related operations
exports.CommentController = {
    // Async function to create a comment
    async createComment(req, res) {
        // Establish database connection
        await connect();

        // Extract necessary data from the request body
        const { content, postId, userId } = req.body;

        try {
            // Create the comment in the database
            const comment = await Comment.create({
                content: content,
                postId: postId,
                userId: userId
            });

            // Send the created comment in the response
            res.status(201).json(comment);
        } catch (error) {
            // Handle any errors and send an error response
            res.status(500).json({ error: "Unable to create comment" });
        }
    },

    // Async function to update a comment
    async updateComment(req, res) {
        // Establish database connection
        await connect();

        // Extract necessary data from the request body
        const { content } = req.body;

        try {
            // Find the comment in the database based on the provided ID
            let comment = await Comment.findByPk(req.params.id);

            // Check if the comment is not found and return a 404 error if so
            if (!comment)
                return res.status(404).json({ error: "Comment not found" });

            // Update the comment in the database
            comment.content = content;
            await comment.save();

            // Send a success message in the response
            res.send({ message: "Comment updated successfully" });
        } catch (error) {
            // Handle any errors and send an error response
            res.status(500).json({ error: "Unable to update comment" });
        }
    },

    // Async function to delete a comment
    async deleteComment(req, res) {
        // Establish database connection
        await connect();

        try {
            // Find the comment in the database based on the provided ID
            let comment = await Comment.findByPk(req.params.id);

            // Check if the comment is not found and return a 404 error if so
            if (!comment)
                return res.status(404).json({ error: "Comment not found" });

            // Delete the comment from the database
            await comment.destroy();

            // Send a success message in the response
            res.send({ message: "Comment deleted successfully" });
        } catch (error) {
            // Handle any errors and send an error response
            console.log(error)
            res.status(500).json({ error: "Unable to delete comment" });
        }
    },

    // Async function to get a post by ID
    async getComment(req, res) {
        // Establish database connection
        await connect();

        // Find the user in the database based on the provided ID
        let user = await Comment.findByPk(req.params.id);

        // Check if the user is not found and return a 404 error if so
        if (!user)
            res.status(404).json({ errors: { msg: "Comment not found" } });
        else
            // Send the parsed user data in the response
            res.status(200).json(user);
    }
};
