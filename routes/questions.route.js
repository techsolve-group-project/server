const express = require("express");

const QuestionPostController = require("../controllers/question.controller");

const { questionOwnerOnly } = require("../middlewares/authorization");

const router = express.Router();

router.post("/", QuestionPostController.createQuestion);
router.get("/", QuestionPostController.getAllQuestions);
router.get("/my-questions", QuestionPostController.getQuestionByUser);
router.get("/:id", QuestionPostController.getQuestionById);

router.put("/:id", questionOwnerOnly, QuestionPostController.updateQuestion);
router.delete("/:id", questionOwnerOnly, QuestionPostController.deleteQuestion);

module.exports = router;
