const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET
module.exports = {
  signToken: (payload) => {
    return jwt.sign(payload, jwt_secret);
  },

  verifyToken: (token) => {
    return jwt.verify(token, jwt_secret);
  },
};
