const mongoose = require('mongoose');
// const {Schema} = require('mangoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true // for unique email id
    },
    password : {
        type : String,
        required : true
    },
    
    date : {
        type : Date,
        default : Date.now
        // default : Date.now()  ----->>>>   not call the function


    }
    

})

module.exports = mongoose.model('user', userSchema); // Schema se model bnaya