const mongoose = require('mongoose');

const AuthUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('AuthUser', AuthUserSchema);