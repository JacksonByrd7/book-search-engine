const jwt = require("jsonwebtoken");

// Set token secret and expiration date
const { secret, expiration } = require("./config"); // Assuming you have your JWT secret and expiration defined in a separate file

module.exports = {
  // Function for our authenticated routes
  authMiddleware: async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(400).json({ message: "You have no token!" });
    }

    try {
      const token = authorizationHeader.replace("Bearer ", ""); // Remove 'Bearer ' prefix
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Set user data on the req object
      next();
    } catch (error) {
      console.error("Invalid token:", error.message);
      return res.status(400).json({ message: "Invalid token!" });
    }
  },
  signToken: ({ username, email, _id }) => {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
