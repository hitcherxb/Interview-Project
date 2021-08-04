const express = require("express")
const { registerUser, authUser, getinfo } = require("../controllers/userControllers")
const router = express.Router()




router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/getinfo').get(getinfo);




module.exports = router;