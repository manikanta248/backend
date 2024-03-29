const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminuserSchema = new Schema({
    adminid:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('adminuser', adminuserSchema);
