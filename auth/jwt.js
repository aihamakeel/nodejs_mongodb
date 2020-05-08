const jwt  = require('jsonwebtoken');
require('dotenv');
//get token------------------------------------------------
const getToken = sub => {
    const token = jwt.sign({sub},process.env.JWT_SECRET,{
        algorithm: "HS256",
		expiresIn: 3600,
    });
    return token;
}
//Verify message
const verifyMeg =(Verify,Msg)=>{
    const message = {
        verify:Verify,
        msg:Msg
    }
    return message;
}
//Verify token
const verifyToken = (req) => {
        var payload;
        const headerToken = req.headers.authorization;
        if(!headerToken) return verifyMeg(false,"No token");
        const bearerToken = headerToken.split(" ");
        try {
            payload = jwt.verify(bearerToken[1],process.env.JWT_SECRET);
        } catch (error) {
            if(error instanceof jwt.JsonWebTokenError){
                return verifyMeg(false,"Unauthorized token");
            }
            return verifyMeg(false,"Invalid token");
        }
        return verifyMeg(true,payload.sub.name);
}
module.exports.getToken = getToken;
module.exports.verifyToken = verifyToken;