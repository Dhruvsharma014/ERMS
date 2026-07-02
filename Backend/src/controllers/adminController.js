const Admin = require("../models/handlerSchema");
const generateToken = require("../utils/jwt");
const adminValidation = require("../validations/adminValidation");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const adminCreate = async (req, res) => {
  const { email, password,userType } = req.body;
  const exists = await Admin.find( {email} );
  console.log(email,password,exists)
  if (exists.length!==0) {
    return res.status(400).json({
      success: false,
      message: "Admin is already exist",
    });
  }


   const admin =  await Admin.create({email,password,...(userType&&{userType})})

    
    const link =
      `http://localhost:5173`;

    await sendEmail({
      email,
      subject: `Welcome to the ERMS ${admin.userType}`,
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Welcome to the ERMS  ${admin.userType}</h2>

          <p>
            Your account has been created successfully. Please click the button below to set your password and access your account.
            Email: ${email} Password: ${password}
          </p>

          <a
            href="${link}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#3E52A0;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
           Login Now
          </a>

        

       
        </div>
      `,
    });

  return res.status(201).json({
    success: true,
    message: "Admin Created Successfully",
  });
  
};

const adminLogin = async (req, res) => {
  const { email, password,userType='management' } = req.body;
  console.log(email, password);
  const user = await Admin.findOne({ email });

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "Email is not register",
    });
  }

  const PasswordCheck = password === user.password;
  if (!PasswordCheck) {
    return res.status(403).json({
      success: false,
      message: "Password Incorrect..",
    });
  }

  const Token = generateToken(user._id);

  res
    .cookie(
      "data",
      JSON.stringify({
        Token,
        userType: user.userType,
        userEmail: user.email,
      }),
      {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      },
    )
    .status(200)
    .json({
      success: true,
      message: "Login Successful",
      data: user,
    });
};

const adminDelete = async (req, res) => {
  const { id } = req.params;

  const user = await Admin.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Deleted",
  });
};

const adminView = async (req, res) => {
  const page = Number(req.query.page)||1
  const limit = Number(req.query.limit)||7
  const skip = (page-1)*limit;
  const user = await Admin.find().sort({createdAt:-1}).skip(skip).limit(limit);
  const totalAdmin = await Admin.countDocuments();
  if(user.length===0){
    return res.status(200).json({
      success:true,
      admin:[]
    })
  }

  res.status(200).json({
    success: true,
    page,limit,totalAdmin,totalPages:Math.ceil(totalAdmin/limit),
    admin: user,
  });
};

const SingleadminView = async (req, res) => {
  
  const emailId = req.params;
 
  const user = await Admin.find({email:emailId.emailId});

  if(user.length===0){
    return res.status(200).json({
      success:true,
      admin:[]
    })
  }

  return res.status(200).json({
    success: true,
    admin: user,
  });
};

const adminupdate = async (req, res) => {
 
  const { id } = req.params;
  console.log(req.body);
  console.log(id)
  const user = await Admin.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
};

const adminlogout = (req, res) => {
  res.clearCookie("data", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

const adminforgot = async (req, res) => {
  const { email } = req.params;
  console.log(email)
  if (!email) return res.status(400).json({ message: "Email required" });
  const exist = await Admin.findOne({ email });
  if (!exist) return res.status(404).json({ message: "Email not found" });
    

     const token = jwt.sign(
      { email: exist.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink =
      `http://localhost:5173/resetpassword/${token}`;

    await sendEmail({
      email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Password Reset Request</h2>

          <p>
            We received a request to reset your password.
          </p>

          <a
            href="${resetLink}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#3E52A0;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>

          <p>
            This link will expire in 15 minutes.
          </p>

          <p>
            If you didn't request this,
            please ignore this email.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Reset link sent successfully",
    });
};

const adminreset = async (req,res) => {

const {token} = req.params ;
const {password} = req.body;

const decoded = await jwt.verify(token,process.env.JWT_SECRET);

if(!decoded){
  return res.status(400).json({
    message:"Invalid token"
  })
}

const email = decoded.email

const user = await Admin.findOneAndUpdate({email},{password:password})
return res.status(200).json({
  success:true,
  message:"Password Update Successfully"
})

}


module.exports = {
  adminLogin,
  adminDelete,
  adminView,
  SingleadminView,
  adminCreate,
  adminupdate,
  adminlogout,
  adminforgot,
  adminreset,

};
