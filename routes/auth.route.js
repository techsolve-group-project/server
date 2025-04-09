const express = require("express");

const AuthController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// login with google
router.post('/google-login', AuthController.loginWithGoogle)

module.exports = router;
