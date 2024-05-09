// Importing necessary modules and functions
const { connect } = require("../dbconfig");
const  Post  = require("../models/posts");

// Exported controller object for handling post-related operations
exports.PostController = {
    // Async function to create a post
    async createPost(req, res) {
        // Establish database connection
        await connect();

        // Extract necessary data from the request body
        const { title, content, authorId } = req.body;

        try {
            // Create the post in the database
            const post = await Post.create({
                title: title,
                content: content,
                authorId: authorId
            });

            // Send the created post in the response
            res.status(201).json(post);
        } catch (error) {
            // Handle any errors and send an error response
            res.status(500).json({ error: "Unable to create post" });
        }
    },

    // Async function to update a post
    async updatePost(req, res) {
        // Establish database connection
        await connect();

        // Extract necessary data from the request body
        const { title, content } = req.body;

        try {
            // Find the post in the database based on the provided ID
            let post = await Post.findByPk(req.params.id);

            // Check if the post is not found and return a 404 error if so
            if (!post)
                return res.status(404).json({ error: "Post not found" });

            // Update the post in the database
            post.title = title;
            post.content = content;
            await post.save();

            // Send a success message in the response
            res.send({ message: "Post updated successfully" });
        } catch (error) {
            // Handle any errors and send an error response
            res.status(500).json({ error: "Unable to update post" });
        }
    },

    // Async function to delete a post
    async deletePost(req, res) {
        // Establish database connection
        await connect();

        try {
            // Find the post in the database based on the provided ID
            let post = await Post.findByPk(req.params.id);

            // Check if the post is not found and return a 404 error if so
            if (!post)
                return res.status(404).json({ error: "Post not found" });

            // Delete the post from the database
            await post.destroy();

            // Send a success message in the response
            res.send({ message: "Post deleted successfully" });
        } catch (error) {
            // Handle any errors and send an error response
            console.log()
            console.log(error)
            res.status(500).json({ error: "Unable to delete post" });
        }
    },

    // Async function to get a post by ID
    async getPost(req, res) {
        // Establish database connection
        await connect();

        // Find the user in the database based on the provided ID
        let user = await Post.findByPk(req.params.id);

        // Check if the user is not found and return a 404 error if so
        if (!user)
            res.status(404).json({ errors: { msg: "Post not found" } });
        else
            // Send the parsed user data in the response
            res.status(200).json(user);
    }
};
