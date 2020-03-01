const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definition of the subject schema

const SubjectModel = new Schema ({
    name : String,
    curriculum : String,
    active: Boolean
});

module.exports = mongoose.model('subject', SubjectModel);