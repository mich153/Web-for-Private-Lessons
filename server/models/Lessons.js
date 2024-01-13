const mongoose = require("mongoose");

const LessonsSchema = new mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        day: {
            type: String,
            require: true
        },
        time_start: {
            type: String,
            require: true
        },
        time_end: {
            type: String,
            require: true
        }, 
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        unit: {
            type: Number,
            require: true
        }
    }
);

module.exports = mongoose.model("lessons", LessonsSchema);