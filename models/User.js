const mongoose = require('mongoose');
//create schema -----------------------------
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    }
});
//export schema------------------------------
module.exports = mongoose.model('User',userSchema);