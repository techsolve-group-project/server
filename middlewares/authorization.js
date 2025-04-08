const { Favourite } = require("../models");

async function ownerOnly(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const favourite = await Favourite.findByPk(id);
    if (!favourite) {
      throw { name: "NotFound", message: "Hero not found" };
    }

    if (favourite.userId !== userId) {
      throw { name: "Forbidden", message: "You are not authorized" };
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = ownerOnly;
