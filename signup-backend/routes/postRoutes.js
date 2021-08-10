const express = require("express")
const { newPost, postFromUser, allPosts } = require("../controllers/postControllers")
const router = express.Router()



//Directs to newPost in postControllers 
router.route('/createPost').post(newPost);
//Directs to postFromUserPost in postControllers 
router.route('/postFromUser').get(postFromUser);
//Directs to allPost in postControllers 
router.route('/').get(allPosts);

module.exports = router;