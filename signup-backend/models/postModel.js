const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    post: {
        type: String,
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;