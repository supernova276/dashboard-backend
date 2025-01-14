import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:20
    },
    password:{
        type:String,
        required:true,
        min:4,
        max:15,
        unique:true
    },
    email:{
        type:String,
        required:true,
        min:2,
        max:100,
        unique:true
    },
    city:String,
    state:String,
    country:String,
    occupation:String,
    PhoneNumber:String,
    transactions:Array,
    role:{
        type:String,
        enum:["user","admin","superadmin"],
        default:"admin"
    }
},
{timestamps:true} //this will create updated at and created at dates
)

const User=mongoose.model("User",userSchema)
export default User