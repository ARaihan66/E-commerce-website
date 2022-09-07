const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

//Defining user schema
const userModel = Schema({
    name: {
        type: String,
        require: true,
        minlenght: 5,
        maxlenght: 100,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        minlenght: 3,
        maxlenght: 255
    },

    password: {
        type: String,
        require: true,
        minlenght: 5,
        maxlenght: 1024,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true })


userModel.methods.getJWT = function () {
    const token = jwt.sign({
        id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,

    }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' })

    return token;
}

// Creating model
const User = model('user', userModel);


const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string().max(5).min(100).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;