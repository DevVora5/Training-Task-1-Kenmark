// Importing necessary modules and functions
const { connect } = require("../dbconfig");
const  User  = require("../models/users");
const { userResponseParser } = require("../parser/userResponseParser");

// Exported controller object for handling user-related operations
exports.UserController = {
    // Async function to get a user by email
    async getUserByEmail(email) {
        const user = await User.findOne({
            where: { email: email },
        });

        return user;
    },

    // Async function to update a user
    async updateUser(req, res) {
        // Establish database connection
        await connect();

        let body = req.body;

        // Iterate over the body object to handle null or undefined values
        for (let k in body) {
            if (k === "password") {
                delete body[k];
            } else if (body[k] == null || body[k] === undefined) {
                delete body[k];
            }
        }

        // Update the user in the database based on the provided ID
        let user = await User.update(body, { where: { id: req.params.id } });

        // Send a success message in the response
        res.send({ message: "User updated successfully" });
    },

    // Async function to get a user by ID
    async getUser(req, res) {
        console.log(req.params.id)
        // Establish database connection
        await connect();

        // Find the user in the database based on the provided ID
        let user = await User.findByPk(req.params.id);

        // Check if the user is not found and return a 404 error if so
        if (!user)
            res.status(404).json({ errors: { msg: "User not found" } });
        else
            // Send the parsed user data in the response
            res.send(userResponseParser(user));
    },

    // Async function to delete a user by ID
    async deleteUser(req, res) {
        // Establish database connection
        await connect();

        // Find the user in the database based on the provided ID
        let user = await User.findByPk(req.params.id);

        // Check if the user is not found and return a 404 error if so
        if (!user)
            res.status(404).json({ errors: { msg: "User not found" } });
        else {
            // Delete the user from the database
            user.destroy();
            // Send a success message in the response
            res.send({ message: "User deleted successfully" });
        }
    }
};
