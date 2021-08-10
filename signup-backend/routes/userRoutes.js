const express = require("express")
const { registerUser, authUser, getinfo, input } = require("../controllers/userControllers")
const router = express.Router()



//Directs to registerUser in userControllers 
router.route('/').post(registerUser);
//Directs to authUser in userControllers 
router.route('/login').post(authUser);
//Directs to getinfo in userControllers 
router.route('/getinfo').get(getinfo);
//Directs to input in userControllers 
router.route('/input').post(input);




module.exports = router;