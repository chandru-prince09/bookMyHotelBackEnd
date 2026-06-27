const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required"],
        lowercase: true,
        trim: true,
        validate: [validator.isAlpha, "firstname must be alphabetic"]
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"],
        trim: true,
        lowercase: true,
        validate: [validator.isAlpha, "lastname must be alphabetic"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "email is invalid"]
    },
    photo: {
        type: String,
        required: [true, "photo is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "confirmpassword is required"],
        select: false,
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: "confirmpassword is not matching"
        }
    },
    mobilenumber: {
        type: String,
        required: [true, "mobilenumber is required"],
        unique: true,
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    this.confirmPassword = undefined;
    //hashing the password
    this.password = await bcrypt.hash(this.password, 12)

})
userSchema.methods.comparePassword = async function (password, storedPassword) {
    return await bcrypt.compare(password, storedPassword)
}

const user = mongoose.model("user", userSchema)
module.exports = user