import Test from "../models/Test.js";
import {
    getWPMLeaderboard,
    getCPMLeaderboard,
    getAccuracyLeaderboard,
    getAvg,
} from "../helpers/test.helper.js";

const getTestHistory = async (req, res) => {
    const userId = req.userId;

    try {
        // ** get test history
        const testHistory = await Test.find({ user: userId }).sort({
            createdAt: -1,
        });

        // ** check if test history exists
        if (!testHistory) {
            throw new Error("No test history found");
        }

        return res.status(200).json({
            success: true,
            message: "Test history fetched successfully",
            data: testHistory,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "Error while getting test history",
            error: error.message,
        });
    }
};

const saveHistory = async (req, res) => {
    try {
        const { WPM, CPM, accuracy, mistakes, backspace } = req.body;
        const userId = req.userId;

        // ** validation
        if (!WPM || !CPM || !accuracy || !mistakes || !backspace) {
            throw new Error("some required fields are missing");
        }

        // ** save test
        const newTest = await Test({
            user: userId,
            WPM,
            CPM,
            accuracy,
            mistakes,
            backspace,
        });
        await newTest.save();

        return res.status(201).json({
            success: true,
            message: "Test added successfully",
            data: newTest,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "Error while adding test",
            error: error.message,
        });
    }
};

const getLeaderboard = async (req, res) => {
    const { leadby = "WPM", page = 1, limit = 10 } = req.query;

    try {
        // ** total number of tests
        const count = await Test.countDocuments({});

        let leaderboard = {};

        // ** get leaderboard based on leadby parameter
        switch (leadby) {
            case "WPM": {
                const WPMLeaderboard = await getWPMLeaderboard(page, limit);
                if (!WPMLeaderboard.success) {
                    throw new Error(WPMLeaderboard.error);
                }
                leaderboard = WPMLeaderboard.WPMLeaderboard;
                break;
            }
            case "CPM": {
                const CPMLeaderboard = await getCPMLeaderboard(page, limit);
                if (!CPMLeaderboard.success) {
                    throw new Error(CPMLeaderboard.error);
                }
                leaderboard = CPMLeaderboard.CPMLeaderboard;
                break;
            }
            case "accuracy": {
                const accuracyLeaderboard = await getAccuracyLeaderboard(page, limit);
                if (!accuracyLeaderboard.success) {
                    throw new Error(accuracyLeaderboard.error);
                }
                leaderboard = accuracyLeaderboard.accuracyLeaderboard;
                break;
            }
            default: {
                throw new Error("Invalid leadby parameter");
            }
        }

        return res.status(200).json({
            success: true,
            message: "leaderboard fetched successfully",
            data: leaderboard,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(count / limit),
                totalCount: count,
            },
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "Error while getting leaderboard",
            error: error.message,
        });
    }
};

const getStats = async (req, res) => {
    const userId = req.userId;

    try {
        // ** get test history
        const testHistory = await Test.find({ user: userId }).sort({
            createdAt: -1,
        });

        // ** check if test history exists
        if (!testHistory) {
            throw new Error("No test history found");
        }

        // ** calculate average WPM, CPM, accuracy, mistakes, backspace
        const avg = await getAvg(testHistory);
        if (!avg.success) {
            throw new Error(avg.error);
        }
        const allAvg = avg.avg;

        return res.status(200).json({
            success: true,
            message: "Stats fetched successfully",
            data: {
                allAvg: allAvg,
            },
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "Error while getting stats",
            error: error.message,
        });
    }
};

export { getTestHistory, saveHistory, getLeaderboard, getStats };
