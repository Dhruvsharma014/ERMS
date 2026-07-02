const express = require('express')
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler')
const validateAdmin = require('../middleware/validateAdmin')
const {adminLogin,adminDelete,adminView,SingleadminView,adminCreate, adminupdate, adminlogout,adminforgot,adminreset} = require('../controllers/adminController')

router.post('/create',asyncHandler(adminCreate))
router.post('/login',asyncHandler(adminLogin))
router.delete('/delete/:id',asyncHandler(adminDelete))
router.patch('/edit/:id',asyncHandler(adminupdate))
router.get('/view/:emailId',asyncHandler(SingleadminView))
router.get('/view',asyncHandler(adminView))
router.post('/logout',asyncHandler(adminlogout))
router.post('/forgotpassword/:email',asyncHandler(adminforgot
))
router.post('/resetpassword/:token',asyncHandler(adminreset
))

module.exports = router;