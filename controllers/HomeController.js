const bcrypt = require("bcrypt");

const { connect } = require("../dbconfig");
const  User  = require("../models/users");
const { userResponseParser } = require("../parser/userResponseParser");
const { JWTController } = require("./JWTController");
const { UserController } = require("./UserController");
const  Post  = require("../models/posts");
const  Comment  = require("../models/comments");

// Exported controller object for handling registration and login
exports.HomeController = {
  // Async function for user registration
  async register(req, res) {
    // Establish database connection
    await connect();

    // Check if the user with the provided email already exists
    let user = await UserController.getUserByEmail(req.body.email);

    if (user)
      return res
        .status(400)
        .json({ errors: { msg: "User account already exists" } });

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create a new user in the database
    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Create a JWT token for the user
    const token = JWTController.createToken({ email: user.email }, true);

    // Set a refresh token in the response cookie
    res.cookie("refresh_token", token.refresh_token, {
      expires: new Date(Date.now() + 30 * 24 * 360000),
      httpOnly: true,
    });

    // Send the user data and access token in the response
    res.send({ ...userResponseParser(user), access_token: token.access_token });
  },

  // Async function for user login
  async login(req, res) {
    // Establish database connection
    await connect();

    // Check if the user with the provided email exists
    let user = await UserController.getUserByEmail(req.body.email);

    if (!user)
      return res.status(404).json({ errors: { msg: "Please register" } });

    // Compare the provided password with the stored hashed password
    if (bcrypt.compareSync(req.body.password, user.password)) {
      // Create a JWT token for the user
      const token = JWTController.createToken({ email: user.email }, true);

      console.log("Login Successful!");

      // Set a refresh token in the response cookie
      res.cookie("refresh_token", token.refresh_token, {
        expires: new Date(Date.now() + 30 * 24 * 360000),
        httpOnly: true,
      });

      // Send the user data and access token in the response
      res.send({ ...userResponseParser(user), access_token: token.access_token });
    } else {
      // If password is incorrect, return an error response
      res.status(400).json({ errors: { msg: "Incorrect password" } });
    }
  },

  // Async function for creating a new comment on a post
  async createComment(req, res) {
    // Establish database connection
    await connect();

    // Create a new comment in the database
    const comment = await Comment.create({
      userId: req.user.id, // Assuming the user is authenticated and user data is available in req.user
      postId: req.body.postId,
      content: req.body.content,
    });

    // Send the created comment data in the response
    res.send(comment);
  },
};
