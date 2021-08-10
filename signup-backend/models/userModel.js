const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        default: ''
    },
    username: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: '',
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Post"
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema)

module.exports = User;