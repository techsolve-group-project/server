const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/profile", UserController.userProfile);

module.exports = router;
