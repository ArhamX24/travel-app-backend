import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

let UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true , unique: true},
    password: {type: String, required: true},
    phNumber: {type: Number, required: true}
},
{
    timestamps: true
}
);

UserSchema.pre("save", async function (next) {
    let user = this;
    if(!user.isModified('password')){
        return next()
    }
    try {
        let salt = await bcrypt.genSalt(10);
        let hashPass = await bcrypt.hash(user.password, salt);
        user.password = hashPass;
        next()
    } catch (error) {
        console.log(error.message);
    }
});

UserSchema.methods.comparePassword = async function (userPassword) {
    let res = await bcrypt.compare(userPassword, this.password);
    return res
}

UserSchema.methods.generateToken = function () {
    let user = this;
    let token = jwt.sign({email: user.email, password: user.password}, process.env.SECRET_KEY);
    return token
}

let User = model("HotelUser", UserSchema);

export default User

