const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        fullName,
        username,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }


});

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error('Invalid Username or Password!')
    }


});

const getinfo = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const tokenauth = jwt.verify(token, process.env.JWT_SECRET)
    const response = await User.findById(tokenauth.id)
    console.log(response)
    res.json({ data: response })
});
module.exports = { registerUser, authUser, getinfo };