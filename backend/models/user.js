import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import passwordComplexity from 'joi-password-complexity';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
    userName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    followed: [{type: Object}],
    saved: [{type: Object}],
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, userName: this.userName}, process.env.JWTPRIVATEKEY,{expiresIn:"30d"});
    return token
};

const User = mongoose.model("user",userSchema);

const validate = (data) => {
    const schema = Joi.object({
        userName: Joi.string().required().label("userName"),
        email: Joi.string().email().required().label("email"),
        password: passwordComplexity().required().label("password")
    });
    return schema.validate(data)
}

export {User, validate}