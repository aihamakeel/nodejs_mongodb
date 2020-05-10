const mongoose = require('mongoose');

//create db schema------------------------------------
const PostSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     desc:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
//export schema-------------------------------------
module.exports = mongoose.model('Post', PostSchema);