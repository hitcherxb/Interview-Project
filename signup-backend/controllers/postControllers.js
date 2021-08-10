const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const Post = require('../models/postModel')
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken')

const newPost = asyncHandler(async (req, res) => {
    const { userInput } = req.body;
    console.log(req.body)

    const token = req.headers.authorization.split(' ')[1]
    const tokenauth = jwt.verify(token, process.env.JWT_SECRET)
    console.log(tokenauth)
    console.log("hi")

    const post = await Post.create({ post: userInput, creator: [tokenauth.id] })




    const input = await User.findByIdAndUpdate(tokenauth.id, { $push: { "post": post._id } })

    res.status(201).json({
        data: input,
    })
});

const postFromUser = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const tokenauth = jwt.verify(token, process.env.JWT_SECRET)

    const post = await User.findById(tokenauth.id).populate('post')
    res.status(201).json({
        data: post,
    })
})

const allPosts = asyncHandler(async (req, res) => {

    const post = await Post.find({}).populate('creator')
    res.status(201).json({
        data: post,
    })
})


module.exports = { newPost, postFromUser, allPosts };