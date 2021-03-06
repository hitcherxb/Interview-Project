const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken')

//Puts info into server to signup
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;
    //Checks if the user exists already
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User Already Exists')
    }
    //Creates the user
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

//logs user in
const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    //Checks to see if users info is correct
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

//checks with JWT and pulls info form that user
const getinfo = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const tokenauth = jwt.verify(token, process.env.JWT_SECRET)
    const response = await User.findById(tokenauth.id)
    res.json({ data: response })
});

//posting users input
const input = asyncHandler(async (req, res) => {
    const { userInput } = req.body;
    console.log(req.body)

    const token = req.headers.authorization.split(' ')[1]
    const tokenauth = jwt.verify(token, process.env.JWT_SECRET)
    console.log(tokenauth)

    const input = await User.findByIdAndUpdate(tokenauth.id, { $push: { "input": userInput } })

    res.status(201).json({
        data: input,
    })
});



module.exports = { registerUser, authUser, getinfo, input };