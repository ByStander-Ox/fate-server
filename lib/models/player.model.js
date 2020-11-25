const { model, Schema }= require("mongoose");

module.exports = model("player", new Schema({
    banned_at: Date,
    ban_expiry: Date,
    ban_reason: String,
    is_banned: Boolean,

    uuid: {
        type: String,
        unique: true,
        required: true
    }
}));