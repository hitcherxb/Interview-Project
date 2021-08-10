const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Post = require('../models/postModel')
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken')

//
const newPost = asyncHandler(async (req, res) => {
    const { userInput } = req.body;
    //takes token and auth it with JWT
    const token = req.headers.authorization.split(' ')[1]
    const tokenauth = jwt.verify(token, process.env.JWT_SECRET)
    //creates a field in the backend with the post and ID of the creator
    const post = await Post.create({ post: userInput, creator: [tokenauth.id] })
    //checks the id and matches it to the post then pushes the info
    const input = await User.findByIdAndUpdate(tokenauth.id, { $push: { "post": post._id } })

    res.status(201).json({
        data: input,
    })
});


const postFromUser = asyncHandler(async (req, res) => {
    //takes token and auth it with JWT
    const token = req.headers.authorization.split(' ')[1]
    const tokenauth = jwt.verify(token, process.env.JWT_SECRET)
    //use id to find the user and populate the post
    const post = await User.findById(tokenauth.id).populate('post')
    res.status(201).json({
        data: post,
    })
})

const allPosts = asyncHandler(async (req, res) => {
    //gathers all the posts
    const post = await Post.find({}).populate('creator')
    res.status(201).json({
        data: post,
    })
})


module.exports = { newPost, postFromUser, allPosts };