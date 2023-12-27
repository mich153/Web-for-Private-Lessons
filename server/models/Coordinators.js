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
        }
    }
);

module.exports = mongoose.model("coordinators", CoordinatorsSchema);