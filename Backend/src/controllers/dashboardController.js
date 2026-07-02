 const User = require("../models/userSchema");
 const Admin = require("../models/handlerSchema");
  const getEmployeeCount = async (req, res) => {
    
  const totalUser = await User.countDocuments();
    
  const totalAdmin = await Admin.countDocuments();

  res.status(200).json({
    success: true,
    totalUser:totalUser,
    totalAdmin:totalAdmin
  });
};
module.exports = getEmployeeCount