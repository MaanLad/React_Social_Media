// import {bcrypt} from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User} from '../models/User.js'
import { scryptSync,randomBytes } from 'crypto';
const salt = randomBytes(16).toString("hex")


// Register user 
export const register= async (req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        }=req.body;
        // const salt=await bcrypt.genSalt();
        // const passwordHash=await bcrypt(password,salt);
        const passwordHash = scryptSync(password, salt, 32).toString("hex");
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*10000),
            impression:Math.floor(Math.random()*10000)
        });
        const savedUser=await newUser.save();
        res.status(202).json(savedUser);
    }catch(err){
        res.status(500).json(`this error${err.message}`);
    }
}

