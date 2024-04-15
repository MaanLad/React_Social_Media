import {User} from '../models/User.js'
import {Post} from "../models/Post.js"

export const createPost= async(req,res)=>{
    try{
        const {userId,description,picturePath}=req.body;
        const user=await User.findById(userId);
        const newPost=new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath, 
            picturePath,
            likes:{},
            comments:[]
        })
        await newPost.save();
        const post =await Post.find();
        res.status(201).json(post);
    }catch(err){
        res.status(409).json({message:err.message});
    }
}

export const getFeedPosts= async (req,res)=>{
    try{
        
    }catch(err){
        res.status(409).json({message:err.message});
    }
}

export const getUserPosts= async (req,res)=>{
    try{
        
    }catch(err){
        res.status(409).json({message:err.message});
    }
}


export const likePost= async (req,res)=>{
    try{
        
    }catch(err){
        res.status(409).json({message:err.message});
    }
}

