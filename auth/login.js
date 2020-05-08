const router = require('express').Router();
const User = require('../models/User');
const { notifyMessage } = require('../notification');
const { loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const { getToken } = require('../auth/jwt');

//Get hashed password function -----------------------
const hashPWD =  data =>{
    const hash = bcrypt.hashSync(data, 10);
    return hash;
}

// login route ---------------------------------------
router.post('/',async (req,res)=>{
    //check validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).json(notifyMessage(false,'Validation error','',error.details[0].message));
    // check login
    try {
        const user = await User.findOne({email:req.body.email});
        if(user){
            const checkPwd = bcrypt.compareSync(req.body.pwd,user.pwd);
            if(checkPwd){
                //generate token
                const token = getToken(sub = {id: user._id,name: user.name, email:user.email});
                //send token with login
                res.status(200).json(notifyMessage(true,'Login successfully',{token: token},''));
                console.log('Login successfully');
            }else{
                res.status(400).json(notifyMessage(false,'Login faild','','Email or password invalid'));
                console.log('Email or password invalid');
            }
        }else{
            res.status(400).json(notifyMessage(false,'Login faild','','Email or password invalid'));
            console.log('Email or password invalid');
        }
    } catch (error) {
        res.status(400).json(notifyMessage(false,'Login error','',error));
        console.log(error);
    }
    
});

//export login route
module.exports = router;