const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");

const authRoutes = require("./auth.route");

const RootController = require("../controllers/root.controller");

router.get("/", RootController.hello);
router.use("/auth", authRoutes);
router.use(authentication);

module.exports = { router };
