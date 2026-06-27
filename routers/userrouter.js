const express = require("express");
const userRouter = express.Router();
const userControl = require("../controllers/usercontroller");

userRouter.route("/")
    .get(userControl.getAllUsers)
    .post(userControl.createUser);

userRouter.route("/:id")
    .get(userControl.getUserById)
    .patch(userControl.updateUser)
    .delete(userControl.deleteUser)
    .put(userControl.updateUser);

module.exports = userRouter;
