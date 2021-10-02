const { Schema, model } = require("mongoose");

let User = new Schema({
    id: String,
    candies: Number
});

module.exports = model('users', User);