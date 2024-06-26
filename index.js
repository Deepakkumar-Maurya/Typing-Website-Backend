import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import connectDB from "./config/db.js";

const app = express();

// ** db connection
connectDB();

// ** global middlewares
app.use(
    cors({
        origin: "*",    // origin: "https://fastestfingerfirst.vercel.app",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ** root route
app.use("/", router);

// ** server run
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
