import { Router } from "express";
import auth from "./auth.routes.js";
import test from "./test.routes.js";

const router = Router();

// ** routes
router.use("/auth", auth);
router.use("/test", test);

// ** root route
router.get("/", (req, res) => {
    res.status(200).json({
        title: "Typing Website API",
        description: "API for Typing Website.",
        routes: {
            "POST /auth/signup": "User registration",
            "POST /auth/signin": "User login",
            "GET /auth/logout": "User logout",
            "GET /test/getHistory": "Get user typing history",
            "POST /test/saveHistory": "Save user typing history",
            "GET /test/getLeaderboard": "Get leaderboard",
            "GET /test/getStats": "Get user stats",
        },
    });
});

export default router;






//TODO: Analytics You Can Perform on Typing Data
// ** Speed Analysis:
// Average typing speed (words per minute or characters per minute).
// Speed variations over time (improvement trends).

// ** Accuracy Analysis:
// Error rate (percentage of mistakes).
// Commonly mistyped words or characters.
// Accuracy trends over time.

// ** Consistency Analysis:
// Consistency of typing speed.
// Variations in speed and accuracy during a session.

// ** Progress Tracking:
// Improvement in speed and accuracy over multiple sessions.
// Milestones achieved (e.g., first 50 WPM, reduced error rate by 10%).

// ** Session Analysis:
// Duration of practice sessions.
// Time of day when performance is best.

// ** Heatmaps:
// Visual representation of the keyboard to show which keys are frequently mistyped or typed slowly.

// ** Typing Patterns:
// Analysis of typing patterns (e.g., frequent pauses, burst typing).

// ** Comparison Metrics:
// Comparison of user performance against average metrics or against other users.

// ** Challenge Performance:
// Performance in specific typing challenges or exercises.

// ** Personalized Feedback:
// Insights and recommendations based on the user’s historical data.