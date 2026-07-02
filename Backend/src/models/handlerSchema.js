const mongoose = require('mongoose')

const handleSchema =  new mongoose.Schema({
email:{
 required:true,
 type:String,
 unique:true,
},
password:{
 required:true,
 type:String,
 min:8
},
userType:{
    type:String,
    enum:['admin','management'],
    default:'management'
}
},{timestamps:true})

module.exports = mongoose.model('Admin',handleSchema,'admin')