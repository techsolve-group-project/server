const express = require("express");

const CommentController = require("../controllers/comment.controller");

const { commentOwnerOnly } = require("../middlewares/authorization");

const router = express.Router();

router.post("/:questionPostId", CommentController.createComment);

router.put("/:id", commentOwnerOnly, CommentController.updateComment);
router.delete("/:id", commentOwnerOnly, CommentController.deleteComment);

router.patch("/:id/vote", CommentController.voteComment);

module.exports = router;
