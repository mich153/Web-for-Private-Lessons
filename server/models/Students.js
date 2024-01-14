const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            require: true
        },
        cls: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "classes",
            require: true
        },
        class_number: {
            type: Number,
            min: 1
        },
        learned_lessons: mongoose.Schema.Types.Mixed,
        id: {
            type: Number,
            min: 200000000,
            max: 400000000
        }
    }
);

module.exports = mongoose.model("students", StudentsSchema);