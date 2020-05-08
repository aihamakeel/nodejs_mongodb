const router = require('express').Router();
const User = require('../models/User');
const { notifyMessage } = require('../notification');
const { regValidation } = require('../validation');
const bcrypt = require('bcryptjs');

//Get hashed password function--------------------------------
const hashPWD =  data =>{
    const hash = bcrypt.hashSync(data, 10);
    return hash;
}
//users routers-----------------------------------------------
//get all users
router.get ('/',async (req,res)=>{
    try {
        //get all
        const users = await User.find();
        res.status(200).json(notifyMessage(true,'Users readed successfully',users,''));
        console.log('Users readed successfully')
    } catch (error) {
        res.status(400).json(notifyMessage(false,'Users was not readed','',error));
        console.log(error);
    }
});
//reqister user
router.post('/register',async (req,res)=>{
    //check validation
    const { error } = regValidation(req.body);
    if(error) return res.status(400).json(notifyMessage(false,'Validation error','',error.details[0].message));
    try {
        //check email exists
        const emailExist = await User.findOne({email:req.body.email});
        if(emailExist) return res.status(400).json(notifyMessage(false,'Users was not registered','','This email is already exists'));
        //add user
        const user = new User ({
            name:req.body.name,
            email: req.body.email,
            pwd: hashPWD(req.body.pwd)
        });
        const addUser = await user.save();
        res.status(200).json(notifyMessage(true,'User registered successfully',addUser,''));
        console.log('User registered successfully');
    } catch (error) {
        res.status(400).json(notifyMessage(false,'Users was not registered','',error));
        console.log(error);
    }
});
//get one user
router.get('/:userID',async(req,res)=>{
    try {
        const users = await User.findById({_id:req.params.userID});
        res.status(200).json(notifyMessage(true,'Users readed successfully',users,''));
        console.log('Users readed successfully');
    } catch (error) {
        res.status(400).json(notifyMessage(false,'Users was not readed','',error));
        console.log(error);
    }
});
//update user
router.patch('/:userID',async(req,res)=>{
    //check validation
    const { error } = regValidation(req.body);
    if(error) return res.status(400).json(notifyMessage(false,'Validation error','',error.details[0].message));
    //update user
    try {
       const updateUser = await User.updateOne(
        {_id:req.params.userID},
        {$set:{name:req.body.name,pwd:hashPWD(req.body.pwd)}}
        )
        res.status(200).json(notifyMessage(true,'User updated successfully',updateUser,''));
        console.log('User updated successfully'); 
    } catch (error) {
        res.status(400).json(notifyMessage(false,'Users was not updated','',error));
        console.log(error);
    }  
});
//delete user
router.delete('/:userID',async(req,res)=>{
    try {
        const deleteUser = await User.remove({_id:req.params.userID});
        res.status(200).json(notifyMessage(true,'User deleted successfully',deleteUser,''));
    } catch (error) {
        res.status(400).json(notifyMessage(false,'Users was not deleted','',error));
        console.log(error);
    }
});

//export user routes -------------------------------------------
module.exports = router;