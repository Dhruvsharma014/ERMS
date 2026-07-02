const AdminValidation = require('../validations/adminValidation')

const validateAdmin = (req,res,next)=>{

const {error} = AdminValidation.validate(req.body);

if(error){
    return res.status(400).json({
        message:error.details[0].message
    })
}
next();
}

module.exports = validateAdmin;