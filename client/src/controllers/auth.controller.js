const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()
// const {SECRET_TOKEN}=require("../../configs/auth.config")
const User=require('../models/user.model')

export const userSignup=async(req,res)=>{

    const {name,password,email,city,state,country,occupation,phoneNumber,transactions}=req.body

    try{
        const hashedPassword= await bcrypt.hashSync(password,10)

        const newUser=new User({
        name,
        password:hashedPassword,
        email,
        city,
        state,
        country,
        occupation,
        phoneNumber,
        transactions
    })
    const user=await newUser.save()
    return res.status(201).send(user)
}
catch(err){
    res.status(500).send({message:err.message})
}
}

export const userLogin=async(req,res)=>{

    const{name,password}=req.body

    const user=await User.findOne({password:password})

    if(!user)return res.status(401).send({message:"incorrect password"})

    try{
        const isValidPassword= await bcrypt.compareSync(password,user.password)

        if(!isValidPassword){
            return res.status(401).send({message:"the password is invalid"})
        }

        var token=jwt.sign({name:user.name},SECRET_TOKEN,{expiresIn:'24h'})

        return res.status(200).send({
            name:user.name,
            email:user.email,
            number:user.number,
            userType:user.userType,
            userStatus:user.userStatus,
            accesstoken:token
        })

}
catch(err){}
}