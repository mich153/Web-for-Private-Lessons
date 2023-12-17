const mongoose = require("mongoose");

const TeachersSchema = new mongoose.Schema(
    {
        
    }
);

module.exports = mongoose.model("teachers", TeachersSchema);