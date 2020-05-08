const Joi = require('@hapi/joi');
//validations ----------------------------------
//add post validation
const postValidation = data => {
    const postVal = {
    name: Joi.string().min(6).max(256),
    desc: Joi.string().min(1).max(1024)
    }
    return Joi.validate(data,postVal);
}
//register validation
const regValidation = data => {
    const regVal = {
        name: Joi.string().min(3).max(256),
        email: Joi.string().min(3).max(256).email(),
        pwd: Joi.string().min(6).max(1024)
    }
    return Joi.validate(data,regVal);
}
module.exports.postValidation = postValidation;
module.exports.regValidation = regValidation;