const mongoose = require("mongoose");

const blueprintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sections: [{
        title: String,
        stateNamw: String,
        fields: [{
            title: String,
            stateName: String,
            type: String,
            rules: String,
        }]
    }]
})

module.exports = mongoose.model("Blueprint", blueprintSchema);