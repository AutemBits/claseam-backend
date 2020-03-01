const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definition of the group schema

const ActivitySchema = new Schema ({
    Title : String,
    Details : String,
    Subject: String
});

module.exports = mongoose.model('activity', ActivitySchema);