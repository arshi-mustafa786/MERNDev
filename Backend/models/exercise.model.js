const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema =  new Schema({
userName :{
    type : String,
    required: true,
    minlength :6
},
password :{
    type: String,
    required : true,
    minlength : 6
},
description  :{
    type : String,
    minlength :6,
    maxlength : 200,
    required :false
},
date :{
    type : Date,
    required: false
}
});


const Exercise= mongoose.model('Exercise',exerciseSchema);

module.exports = Exercise;