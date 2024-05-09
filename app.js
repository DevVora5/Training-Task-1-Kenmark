// Importing necessary modules
const express = require("express");
require("dotenv").config();
const cors = require("cors");

// Creating an Express application
const app = express();
app.use(cors());

// Importing validators, controllers, and routes
const { registerValidator } = require("./validators/registerValidator");
const { HomeController } = require("./controllers/HomeController");
const { loginValidator } = require("./validators/loginValidator");
const { JWTController } = require("./controllers/JWTController");
const { PostController } = require("./controllers/PostController");
const { CommentController } = require("./controllers/CommentController");
const { UserController } = require("./controllers/UserController");
const  userroutes  = require("./routes/userroutes");

const sequelize = require("./db");
const { updateUserValidator } = require("./validators/updateUserValidator.js")
const { updatePostValidator } = require("./validators/updatePostValidator.js")
const { updateCommentValidator } = require("./validators/updateCommentValidator.js")
const { deletePostValidator } = require("./validators/deletePostValidator.js")
const { deleteCommentValidator } = require("./validators/deleteCommentValidator.js")


// Initializing the application (commented out)
// init()

// Configuring middleware for parsing JSON requests
app.use(express.json());

// Using JWT middleware to verify access tokens for user routes
app.use("/user", JWTController.verifyAccessToken.bind(JWTController), userroutes);

// Route for a simple greeting message
app.get("/", (req, res) => {
  res.send({ message: "Hello, Team Kenmark Itan Solutions!" });
});

// Route for user registration
app.post("/register", registerValidator, HomeController.register);

// Route for user login
app.post("/login", loginValidator, HomeController.login);

// Route for obtaining a new access token using a refresh token
app.get("/new_access_token", JWTController.grantNewAccessToken.bind(JWTController));

// Routes for user-related operations
userroutes.put("/users/:id", updateUserValidator, UserController.updateUser);
userroutes.get("/users/:id", UserController.getUser);
userroutes.delete("/users/:id", UserController.deleteUser);

// Routes for post-related operations
app.post("/posts", PostController.createPost);
app.put("/posts/:id", updatePostValidator, PostController.updatePost);
app.get("/posts/:id", PostController.getPost);
app.delete("/posts/:id", deletePostValidator, PostController.deletePost);

// Routes for comment-related operations
app.post("/comments", CommentController.createComment);
app.put("/comments/:id", updateCommentValidator, CommentController.updateComment);
app.get("/comments/:id", CommentController.getComment);
app.delete("/comments/:id", deleteCommentValidator, CommentController.deleteComment);

console.log(sequelize);

// Start the server and listen on port 3000
sequelize.sync({alter:true}).then(()=>{
    console.log("Database is ready!");
  app.listen(3000, () => {
    console.log("Server is running and ready to accept requests!");
  });
})
