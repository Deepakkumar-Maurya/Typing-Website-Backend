import User from "../models/User.js";
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //** header check
        if (!authHeader || authHeader == null || authHeader === "") {
            const error = new Error("No token provided");
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader?.split(" ")[1];

        // ** user verification
        const user = jwt.verify(token, process.env.JWT_SECRET);

        const userFromDB = await User.findById(user.id);
        if (!userFromDB) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        if (userFromDB.token !== token) {
            const error = new Error("Invalid token");
            error.statusCode = 401;
            throw error;
        }

        // ** add user to request
        req.userId = user.id;
        next();
    } catch (error) {
        console.log(error.message);
        const statusCode = error.statusCode || 400;
        return res.status(statusCode).json({
            success: false,
            message: "Error in authentication",
            error: error.message,
        });
    }
}

export default isAuth;
