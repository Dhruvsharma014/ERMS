const userValidation = require('../validations/userValidation')
const validateUser = (req,res,next)=>{
    const {error} = userValidation.validate(req.body);
    if(error){
         return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
}
module.exports = validateUser;