const express = require("express");
const authRouter = express.Router();
const authcontroller = require("../controllers/authcontroller");

authRouter.route("/signup").post(authcontroller.signup);

module.exports = authRouter;