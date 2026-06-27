const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        //generating the jwt token
        const token = jwt.sign(
            { userId: newUser._id, userName: newUser.firstname },
            process.env.SECRET_KEY,
            { expiresIn: process.env.LOGIN_EXPRIES }
        );
        res.status(201).json({
            status: "success",
            authToken: token,
            data: {
                user: newUser,
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // 1. Check email and password are provided
        if (!email || email === "") {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid email"
            });
        }
        if (!password || password === "") {
            return res.status(400).json({
                status: "fail",
                message: "Please enter a valid password"
            });
        }


        // 2. Find user by email — +password to include the hidden field
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }
        const match = await user.comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        // 4. Generate JWT token
        const token = jwt.sign(
            { id: user._id, userName: user.firstname },
            process.env.SECRET_KEY,
            { expiresIn: process.env.LOGIN_EXPRIES }
        );

        res.status(200).json({
            status: "success",
            authToken: token
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};
