const express = require("express");
const router = express.Router();
const  getEmployeeCount  = require("../controllers/dashboardController");
const asyncHandler = require("../middleware/asyncHandler");

router.get("/data",asyncHandler(getEmployeeCount));

module.exports = router;