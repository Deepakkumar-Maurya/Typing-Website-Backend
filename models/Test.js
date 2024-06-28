import mongoose from "mongoose";

// ** test schema
const testSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    WPM: {
        type: Number,
        required: true,
    },
    CPM: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        required: true,
    },
    mistakes: {
        type: Number,
        required: true,
    },
    backspace: {
        type: Number,
        required: true,
    },
},  { timestamps: true });

const Test = mongoose.model("Test", testSchema);

export default Test;