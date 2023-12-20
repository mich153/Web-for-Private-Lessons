const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSubjectsSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        units: [Number]
    }
);

 module.exports = mongoose.model("schoolSubjects", SchoolSubjectsSchema);