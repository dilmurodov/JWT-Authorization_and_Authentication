const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    refreshToken: {type: String, required: true}
})

module.exports = mongoose.model("Tokens", tokenSchema);