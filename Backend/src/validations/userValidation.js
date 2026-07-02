const joi = require('joi')

 const userValidation = joi.object({
    firstName:joi.string().min(3).required(),
    lastName:joi.string().min(3).required(),
    email:joi.string().email().required(),
    experience:joi.number().min(0).required(),
    technology:joi.string().required()
   
})
module.exports = userValidation



