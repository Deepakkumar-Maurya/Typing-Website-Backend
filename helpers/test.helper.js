import Test from "../models/Test.js";

// ** WPM leaderboard
const getWPMLeaderboard = async (page, limit) => {
    try {
        // ** get WPM leaderboard
        const WPMLeaderboard = await Test.aggregate([
            {
                $group: {
                    _id: "$userId", // group by user ID
                    avgWPM: { $avg: "$WPM" }, // calculate average WPM for each user
                },
            },
            {
                $sort: { avgWPM: -1 }, // sort by average WPM in descending order
            },
            {
                $skip: (page - 1) * limit, // skip the desired number of documents
            },
            {
                $limit: limit, // limit the number of documents returned
            },
        ]);
        return {
            success: true,
            WPMLeaderboard: WPMLeaderboard,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
};

// ** CPM leaderboard
const getCPMLeaderboard = async (page, limit) => {
    try {
        // ** get CPM leaderboard
        const CPMLeaderboard = await Test.aggregate([
            {
                $group: {
                    _id: "$userId", // group by user ID
                    avgCPM: { $avg: "$CPM" }, // calculate average WPM for each user
                },
            },
            {
                $sort: { avgCPM: -1 }, // sort by average WPM in descending order
            },
            {
                $skip: (page - 1) * limit, // skip the desired number of documents
            },
            {
                $limit: limit, // limit the number of documents returned
            },
        ]);
        return {
            success: true,
            CPMLeaderboard: CPMLeaderboard,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

// ** accuracy leaderboard
const getAccuracyLeaderboard = async (page, limit) => {
    try {
        // ** get accuracy leaderboard
        const accuracyLeaderboard = await Test.aggregate([
            {
                $group: {
                    _id: "$userId", // group by user ID
                    avgAccuracy: { $avg: "$accuracy" }, // calculate average WPM for each user
                },
            },
            {
                $sort: { avgAccuracy: -1 }, // sort by average WPM in descending order
            },
            {
                $skip: (page - 1) * limit, // skip the desired number of documents
            },
            {
                $limit: limit, // limit the number of documents returned
            },
        ]);
        return {
            success: true,
            accuracyLeaderboard: accuracyLeaderboard,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

// ** get average
const getAvg = async (testHistory) => {
    try {
        // ** WPM average
        const WPM_avg =
            testHistory.reduce((a, b) => a + b.WPM, 0) / testHistory.length;

        // ** CPM average
        const CPM_avg =
            testHistory.reduce((a, b) => a + b.CPM, 0) / testHistory.length;

        // ** accuracy average
        const accuracy_avg =
            testHistory.reduce((a, b) => a + b.accuracy, 0) / testHistory.length;
        
        // ** mistakes average
        const mistakes_avg =
            testHistory.reduce((a, b) => a + b.mistakes, 0) / testHistory.length;

        // ** backspace average
        const backspace_avg =
            testHistory.reduce((a, b) => a + b.backspace, 0) / testHistory.length;
    
        return {
            success: true,
            avg : {
                WPM_avg,
                CPM_avg,
                accuracy_avg,
                mistakes_avg,
                backspace_avg,
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export { getWPMLeaderboard, getCPMLeaderboard, getAccuracyLeaderboard, getAvg };