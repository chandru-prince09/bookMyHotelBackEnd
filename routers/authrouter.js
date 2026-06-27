const express = require("express");
const authRouter = express.Router();
const authcontroller = require("../controllers/authcontroller");

authRouter.route("/signup")
    .post(authcontroller.signup);


authRouter.route("/login")
    .post(authcontroller.login);

module.exports = authRouter;