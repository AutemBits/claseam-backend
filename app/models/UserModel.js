const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definition of the user schema

const UserSchema = new Schema ({
    forename : String,
    surname : String,
    email : String,
    password: String,
    group : String,
    grades : Array
});

module.exports = mongoose.model('user', UserSchema);