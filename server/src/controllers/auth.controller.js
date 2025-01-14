import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_TOKEN } from '../../configs/auth.config.js';
import User from "../models/user.model.js";
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
        phoneNumber
    })
    const user=await newUser.save()
    return res.status(201).send(user)
}
catch(err){
    res.status(500).send({message:err.message})
}
}

export const userLogin=async(req,res)=>{

    
    const{email,password}=req.body
    
    const user=await User.findOne({email:email})

    if(!user)return res.status(401).send({message:"incorrect email"})

    try{
        const isValidPassword= await bcrypt.compareSync(password,user.password)

        console.log("validdddddd",isValidPassword)

        if(!isValidPassword){
            return res.status(401).send({message:"the password is invalid"})
        }

        console.log("secrettttt",SECRET_TOKEN)

        var token=jwt.sign({name:user.name},process.env.MONGO_URL,{expiresIn:'24h'})

        return res.status(200).send({
           email:user. email,
           state:user. state,
           country:user. country,
           ocupaton:user. occupation,
           city:user. city,
           phoneNumber:user. phoneNumber,
           transactions:user. transactions,
           accesstoken:token
        })

}
catch(err){
    console.log("errorrrr",err)
}
}