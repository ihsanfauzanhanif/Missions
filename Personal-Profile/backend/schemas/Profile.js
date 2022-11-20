const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    nickname: String,
    username: String,
    password: String,
    dob: Date,
    phone: String,
    hobby: String,
    address: String,
    about_me: String,
    skills: Array,
    languages: Array,
    photo: Buffer,
    deletedAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model.Profile || mongoose.model('Profile', ProfileSchema)