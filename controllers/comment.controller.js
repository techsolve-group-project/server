const { User, QuestionPost, Comment } = require("../models");

class CommentController {
  static async createComment(req, res, next) {
    try {
      const { text } = req.body;
      const { questionPostId } = req.params;

      const newComment = await Comment.create({
        QuestionPostId: questionPostId,
        UserId: req.user.id,
        text,
      });

      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }

  static async updateComment(req, res, next) {
    try {
      const { text } = req.body;
      const comment = req.comment;

      await comment.update({ text });

      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const comment = req.comment;

      await comment.destroy();

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async voteComment(req, res, next) {
    try {
      const { id } = req.params;
      const { type } = req.query; // ?type=up or ?type=down

      const comment = await Comment.findByPk(id);
      if (!comment) {
        throw { name: "NotFound", message: "Comment not found" };
      }

      if (type === "up") {
        comment.vote += 1;
      } else if (type === "down") {
        if (comment.vote > 0) {
          comment.vote -= 1;
        }
      } else {
        throw { name: "BadRequest", message: "Invalid vote type" };
      }

      await comment.save();

      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
