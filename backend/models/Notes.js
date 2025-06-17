const mongoose = require('mongoose');
// const {Schema} = require('mangoose')

const notesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    tag : {
        type : String,
        default : "General"
    },
    
    date : {
        type : Date,
        default : Date.now
    }
    

})

module.exports = mongoose.model('notes', notesSchema); // Schema se model bnaya