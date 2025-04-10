const { QuestionPost, Comment } = require("../models");

async function questionOwnerOnly(req, res, next) {
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

async function commentOwnerOnly(req, res, next) {
  try {
    const { id } = req.params;
    const UserId = req.user.id;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw { name: "NotFound", message: "Comment not found" };
    }

    if (comment.UserId !== UserId) {
      throw { name: "Forbidden", message: "You are not authorized" };
    }

    req.comment = comment;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  questionOwnerOnly,
  commentOwnerOnly,
};
