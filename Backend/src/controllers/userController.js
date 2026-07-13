const fs = require("fs");
const User = require("../models/userSchema");
const { userValidation } = require("../validations/userValidation");
const path = require("path");

const addUser = async (req, res) => {


  const { firstName, lastName, email, experience, technology, skill } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    if (req.files?.photo?.[0]) {
      fs.unlinkSync(req.files.photo[0].path);
    }

    if (req.files?.cv?.[0]) {
      fs.unlinkSync(req.files.cv[0].path);
    }
    return res.status(401).json({
      success: false,
      message: "User is Already exists",
    });
  }
  const photo = req.files.photo[0].filename;
  const cv = req.files.cv[0].filename;

 const parsedSkill = skill
  ? JSON.parse(skill)
  : [];


  const user = await User.create({
    firstName,
    lastName,
    email,
    experience,
    technology,
    skill: parsedSkill,
    photo,
    cv,
  });

  res.status(201).json({
    success: true,
    message: "Employee Created",
    user: user,
  });
};

const getUser = async (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page-1)*limit;
  const user = await User.find().sort({createdAt:-1}).skip(skip).limit(limit);
  const totalUser = await User.countDocuments();
  if (user.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No User Document ",
      user: user,
      totalUser,
      page,
      limit
    });
  }
  res.status(200).json({
    success: true,
    user: user,
    totalUser,
    page,
    limit
  });
};

const singleUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user: user,
  });
};

const editUser = async (req, res) => {
  const { id } = req.params;
  let allowedFields = [
    "firstName",
    "lastName",
    "email",
    "experience",
    "technology",
    "skill"
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

   if (updates.skill) {
    updates.skill = JSON.parse(updates.skill);
  }

  const oldUser = await User.findById(id);
  if (req.files?.photo) {
    updates.photo = req.files.photo[0].filename;
    const oldPhoto = path.join(
  __dirname,
  "../uploads/photos",
  oldUser.photo
);

if (fs.existsSync(oldPhoto)) {
  fs.unlinkSync(oldPhoto);
}
  }
  if (req.files?.cv) {
    updates.cv = req.files.cv[0].filename;
    const oldCv = path.join(
  __dirname,
  "../uploads/cv",
  oldUser.cv
);

if (fs.existsSync(oldCv)) {
  fs.unlinkSync(oldCv);
}
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user: user,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const photoPath = path.join(__dirname, "../uploads/photos", user.photo);
  const cvPath = path.join(__dirname, "../uploads/cv", user.cv);
  if (fs.existsSync(photoPath)) {
    fs.unlinkSync(photoPath);
  }

  if (fs.existsSync(cvPath)) {
    fs.unlinkSync(cvPath);
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User Deleted",
  });
};

module.exports = { addUser, getUser, singleUser, editUser, deleteUser };
