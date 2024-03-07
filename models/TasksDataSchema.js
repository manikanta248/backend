const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskdataSchema = new Schema({
    task:{
        type: String,
       
    },
    startDate:{
        type: String,
    },
    endDate:{
        type:String
    },
    user:{
        type:String,
    },
    status:{
        type:String
    }

});

module.exports = mongoose.model('taskdata', taskdataSchema );
