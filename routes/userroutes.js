// Importing necessary modules and controllers
const { UserController } = require("../controllers/UserController");
const { PostController } = require("../controllers/PostController");
const { CommentController } = require("../controllers/CommentController");
const { updateUserValidator } = require("../validators/updateUserValidator");
const { updatePostValidator } = require("../validators/updatePostValidator");
const { updateCommentValidator } = require("../validators/updateCommentValidator");
const { deletePostValidator } = require("../validators/deletePostValidator")
const { deleteCommentValidator } = require("../validators/deleteCommentValidator");

// Importing Express Router
const userroutes = require("express").Router();

// Routes for user-related operations
userroutes.put("/users/:id", updateUserValidator, UserController.updateUser);
userroutes.get("/users/:id", UserController.getUser);
userroutes.delete("/users/:id", UserController.deleteUser);

// Routes for post-related operations
userroutes.post("/posts", PostController.createPost);
userroutes.put("/posts/:id", updatePostValidator, PostController.updatePost);
userroutes.get("/posts/:id", PostController.getPost);
userroutes.delete("/posts/:id", deletePostValidator, PostController.deletePost);

// Routes for comment-related operations
userroutes.post("/comments", CommentController.createComment);
userroutes.put("/comments/:id", updateCommentValidator, CommentController.updateComment);
userroutes.get("/comments/:id", CommentController.getComment);
userroutes.delete("/comments/:id", deleteCommentValidator, CommentController.deleteComment);

// Export the userroutes for use in other parts of the application
module.exports = userroutes;
