const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassesSchema = new Schema(
    {
        age_group: {
            type: String,
            minlength: 1,
            maxlength: 2,
            require: true
        },
        classes_counter_in_age_group: {
            type: Number,
            min: 0,
            max: 12,
            require: true,
            default: 0
        }
    }
);

 module.exports = mongoose.model("classes", ClassesSchema);