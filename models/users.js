const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required"],
        lowercase: true,
        trim:true,
        validate:[validator.isAlpha,"firstname must be alphabetic"]     
    },
    lastname:{
        type:String,
        required:[true,"lastname is required"],
        trim:true,
        lowercase:true,
        validate:[validator.isAlpha,"lastname must be alphabetic"]
        

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        validate:[validator.isEmail,"email is invalid"]
        
    },
    photo:{
        type:String,
        required:[true,"photo is required"],
    },
    
    password:{
        type:String,
        required:[true,"password is required"],
    },
    confirmpassword:{
        type:String,
        required:[true,"confirmpassword is required"],
    },
    mobilenumber:{
        type:String,
        required:[true,"mobilenumber is required"],
        unique:true,
        
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },

    

})

const user = mongoose.model("user",userSchema)
module.exports = user