const express = require("express")
const { newPost, postFromUser, allPosts } = require("../controllers/postControllers")
const router = express.Router()




router.route('/createPost').post(newPost);
router.route('/postFromUser').get(postFromUser);
router.route('/').get(allPosts);





module.exports = router;