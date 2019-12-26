const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
userName :{
    type : String,
    required: true,
    minlength :6
}
});


const User = mongoose.model('User',userSchema);

module.exports = User;