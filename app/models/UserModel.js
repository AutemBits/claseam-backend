const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    dropboxid : String,
    nombre : String,
    correo : String,
    grupo : String,
    calificaciones : Array
});

module.exports = mongoose.model('user', UserSchema);