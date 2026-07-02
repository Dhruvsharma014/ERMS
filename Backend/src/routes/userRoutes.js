const express = require("express");
const router = express.Router();
const {
  addUser,
  getUser,
  singleUser,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const validateUser = require("../middleware/validateUser");
const asyncHandler = require("../middleware/asyncHandler");

router.post(
  "/create",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  asyncHandler(addUser),
);

router.patch(
  "/edit/:id",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  asyncHandler(editUser),
);

router.get("/view", asyncHandler(getUser));

router.get("/view/:id", asyncHandler(singleUser));

router.delete("/delete/:id", asyncHandler(deleteUser));

module.exports = router;
