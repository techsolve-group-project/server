const { User } = require("../models");

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
      });

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async userProfile(req, res, next) {
    try {
      const UserId = req.user.id;
      const user = await User.findByPk(UserId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
