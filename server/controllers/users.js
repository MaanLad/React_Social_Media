import {User} from "../models/User.js";


//READ
export const getUser =async (req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserFriends=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);
        const friends=Promise.all(user.friends.map((id)=>{
            User.findById(id);
        }));
        const formattedFriends=friends.map(
            ({_id,firstName,lastName,location,occupation,picturePath})=>{
                return {id,firstName,lastName,location,occupation,picturePath};
            }
        )
    }catch(err){
        res.status(404).json({message:err.message});
    }
}

//UPDATE