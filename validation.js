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

module.exports.postValidation = postValidation;