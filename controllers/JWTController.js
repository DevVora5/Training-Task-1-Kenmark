// Importing necessary modules
const jwt = require("jsonwebtoken");
const { cookieParser } = require("../helpers/cookieParser");

// Exported controller object for handling JWT-related operations
exports.JWTController = {
  // Function to create JWT tokens
  createToken(payload, refresh = false) {
    // Generate an access token with a short expiration time
    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 30,
    });

    // Generate a refresh token with a longer expiration time if specified
    return {
      access_token: accessToken,
      refresh_token: refresh
        ? jwt.sign(payload, process.env.SECRET, {
            expiresIn: 30 * 24 * 60 * 60,
          })
        : null,
    };
  },

  // Function to verify the validity of a token
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch (e) {
      return false;
    }
  },

  // Middleware function to verify the validity of the access token in the request headers
  verifyAccessToken(req, res, next) {
    const headers = req.headers;
    if (!headers['authorization']) {
      res.status(405).json({ message: "Token not provided" });
      return;
    }

    const token = headers['authorization'].split(" ")[1];

    if (!token || !this.verifyToken(token)) {
      res.status(405).json({ message: "Invalid token" });
    } else {
      next();
    }
  },

  // Function to grant a new access token using a refresh token
  grantNewAccessToken(req, res) {
    console.log(req.headers);  // Log headers for debugging
    const cookies = req.headers.cookie;
  
    if (!cookies) {
      res.status(405).json({ message: "Cookies not provided" });
      return;
    }

    const token = cookieParser("refresh_token", cookies);
    if (!token) {
      res.status(405).json({ message: "Invalid or missing refresh token" });
      return;
    }

    let decoded = this.verifyToken(token);
    if (!decoded) {
      res.status(405).json({ message: "Invalid token" });
    } else {
      console.log(decoded);
      let newToken = this.createToken({ email: decoded.email }, false);
      console.log(newToken);
      res.send({ access_token: newToken.access_token });
    }
  }
};
