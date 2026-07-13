const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    technology:{
        type:String,
        required:true
    },
    skill:{
        type:[String],
        default:[]
    }
    ,
    photo:{
        type:String,
        required:true
    },
    cv:{
        type:String,
        required:true
    }

},{timestamps:true})

userSchema.index({createdAt: -1})

module.exports = mongoose.model('User',userSchema,'user')