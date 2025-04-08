const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const rawToken = authorization.split(" ");
    if (rawToken[0] !== "Bearer" || !rawToken[1]) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const data = verifyToken(rawToken[1]);

    const user = await User.findByPk(data.id);

    if (!user) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
