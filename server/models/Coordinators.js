const mongoose = require("mongoose");

const CoordinatorsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            require: true
        },
        lessons: mongoose.Schema.Types.Mixed,
        major: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "schoolSubjects"
        },
        possible_times: mongoose.Schema.Types.Mixed
    }
);

module.exports = mongoose.model("coordinators", CoordinatorsSchema);