import User from '../models/user.model.js'
export const getAdmins=async(req,res)=>{
    try{
    const admins= await User.find({role:'admin'})

    return res.status(200).json(admins)
    }
    catch(error){
        console.log("errorr",error)
        return res.status(500).send({message:`${error}`})
    }
    
}