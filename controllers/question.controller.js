const { QuestionPost, User } = require("../models");

class QuestionPostController {
  static async createQuestion(req, res, next) {
    try {
      const { title, text } = req.body;

      const newQuestion = await QuestionPost.create({
        UserId: req.user.id,
        title,
        text,
        aiAnswer: "AI belum dijawab", // masih dummy
      });

      res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  }

  static async getAllQuestions(req, res, next) {
    try {
      const questions = await QuestionPost.findAll({
        include: [{ model: User, attributes: ["id", "name", "email"] }],
      });

      res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  }

  static async getQuestionByUser(req, res, next) {
    try {
      const UserId = req.user.id;

      const questions = await QuestionPost.findAll({
        where: {
          UserId: UserId,
        },
      });

      res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  }

  static async getQuestionById(req, res, next) {
    try {
      const { id } = req.params;

      const question = await QuestionPost.findByPk(id, {
        include: {
          model: User,
          attributes: ["id", "name", "email"],
        },
      });

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }

  static async updateQuestion(req, res, next) {
    try {
      const { title, text } = req.body;

      await req.question.update({ title, text });

      res.status(200).json(req.question);
    } catch (error) {
      next(error);
    }
  }

  static async deleteQuestion(req, res, next) {
    try {
      await req.question.destroy();

      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QuestionPostController;
