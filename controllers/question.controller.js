const { QuestionPost, User, Comment } = require('../models');
const { GoogleGenAI } = require('@google/genai');

class QuestionPostController {
  static async createQuestion(req, res, next) {
    try {
      const { title, text } = req.body;
      // --AI LOGIC
      const ai = new GoogleGenAI({
        apiKey: 'AIzaSyABeKlk4uZOFIXt9v7JH37Z1IQKGaJEzU0',
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `As an expert in technology world, can you answer the question '${text}' in technology scope?. And if ${text} doesn't meet the technology context, give a random trivia about technology. And if the ${text} meet technology context, give the answer. Gimme an answer in Indonesian language and character maximal is 100 (include space) due to sequelize error long character maximal, and turn it into one paragraph format`,
      });
      let answer = response.text.replace(/\n/g, '').replace(/\*/g, '').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      console.log(answer);
      // --
      const newQuestion = await QuestionPost.create({
        UserId: req.user.id,
        title,
        text,
        aiAnswer: answer, // udah AI, tapi terkadang lebih dari 255 karakter, kena error sequelize
      });

      res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  }

  static async getAllQuestions(req, res, next) {
    try {
      const questions = await QuestionPost.findAll({
        include: [
          { model: User, attributes: ['id', 'name', 'email'] },
          { model: Comment, attributes: ['UserId', 'text', 'vote', 'createdAt'], include: { model: User, attributes: ['id', 'name', 'email'] } },
        ],
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
        include: [{ model: Comment, attributes: ['UserId', 'text', 'vote', 'createdAt'] }],
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
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email'],
          },
          { model: Comment, attributes: ['UserId', 'text', 'vote', 'createdAt'], include: { model: User, attributes: ['id', 'name', 'email'] } },
        ],
      });

      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
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

      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QuestionPostController;
