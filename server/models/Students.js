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
        total_lessons: {
            type: Number,
            min: 0,
            default: 0
        }, 
        learned_lessons: {
            type: Number,
            min: 0,
            default: 0
        },
        id: {
            type: Number,
            min: 200000000,
            max: 400000000
        }
    }
);

module.exports = mongoose.model("students", StudentsSchema);