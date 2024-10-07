const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@([\w-]+\.)+[\w-]{2,24}$/, 'Please fill a valid email address'],
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      firstName: {
        type: String,
        required: false,
        maxLength: 40,
      },
      lastName: {
        type: String,
        required: false,
        maxLength: 40,
      }
}, {timestamps : true});


module.exports = mongoose.model('User', userSchema);