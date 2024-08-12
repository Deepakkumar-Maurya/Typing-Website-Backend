import User from "../models/User.js";
import { matchPassword, generateAuthToken } from "../helpers/auth.helper.js";

const signup = async (req, res) => {
    try {
        // ** input validations
        if (!req.body.username || !req.body.email || !req.body.password) {
            throw new Error("Please fill all the fields");
        }
        if (req.body.password.length < 4) {
            throw new Error("Password must be at least 4 characters");
        }
        if (
            req.body.email.indexOf("@") === -1 ||
            req.body.email.indexOf(".") === -1 ||
            req.body.email.indexOf("@") > req.body.email.lastIndexOf(".")
        ) {
            throw new Error("Please enter a valid email");
        }

        if (req.body.username.length < 3) {
            throw new Error("Username must be at least 3 characters");
        }

        const { username, email, password } = req.body;

        // ** check if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // ** create a new user
        const newUser = new User({
            username: username,
            email: email,
            password: password,
        });
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error.message);
        const statusCode = error.statusCode || 400;
        return res.status(statusCode).json({
            success: false,
            message: "Error creating new user",
            error: error.message,
        });
    }
};

const signin = async (req, res) => {
    try {
        // ** input validations
        if (!req.body.email || !req.body.password) {
            throw new Error("Please fill all the fields");
        }
        if (req.body.email.indexOf("@") === -1) {
            throw new Error("Please enter a valid email");
        }

        const { email, password } = req.body;

        // ** check if user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("No such user found");
            error.statusCode = 404;
            throw error;
        }

        // ** match password
        const isMatch = matchPassword(user, password);
        if (!isMatch) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        // ** generate a token
        const token = await generateAuthToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 days
        });
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token: token,
        });
    } catch (error) {
        console.log(error.message);
        const statusCode = error.statusCode || 400;
        return res.status(statusCode).json({
            success: false,
            message: "Error while signing user",
            error: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        // ** clear the token
        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "User signed out successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error while signing user out",
            error: error.message,
        });
    }
};

export { signup, signin, logout };
