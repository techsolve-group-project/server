const { QuestionPost } = require("../models");

async function ownerOnly(req, res, next) {
  try {
    const { id } = req.params;
    const UserId = req.user.id;

    const question = await QuestionPost.findByPk(id);
    if (!question) {
      throw { name: "NotFound", message: "Question not found" };
    }

    if (question.UserId !== UserId) {
      throw { name: "Forbidden", message: "You are not authorized" };
    }

    req.question = question;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { ownerOnly };
