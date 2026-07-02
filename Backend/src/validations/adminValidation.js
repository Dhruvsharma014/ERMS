const joi = require('joi')

const adminValidation = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})

module.exports = adminValidation