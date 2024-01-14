const mongoose = require("mongoose");

const TeachersSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            require: true
        },
        lessons: mongoose.Schema.Types.Mixed,
        teaching: mongoose.Schema.Types.Mixed,
        possible_times: mongoose.Schema.Types.Mixed
    }
);

module.exports = mongoose.model("teachers", TeachersSchema);