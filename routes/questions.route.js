const express = require("express");

const QuestionPostController = require("../controllers/question.controller");

const { ownerOnly } = require("../middlewares/authorization");

const router = express.Router();

router.post("/", QuestionPostController.createQuestion);
router.get("/", QuestionPostController.getAllQuestions);
router.get("/my-questions", QuestionPostController.getQuestionByUser);
router.get("/:id", QuestionPostController.getQuestionById);

router.put("/:id", ownerOnly, QuestionPostController.updateQuestion);
router.delete("/:id", ownerOnly, QuestionPostController.deleteQuestion);

module.exports = router;
