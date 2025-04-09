const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const newUser = await User.create({ name, email, password });
      res.status(201).json({
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async loginWithGoogle(req, res, next) {
    try {
      res.json('Hello Google Login')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController;
