import mongoose  from "mongoose";
const PostSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        location:String,
        description:String,
        picturePath:String,
        userPicturePath:String, 
        likes:{
            type:Map,
            of:Boolean,
        },
        comments:{
            types:Array,
            default:[]
        }
    },
    {timestamps:true}
)

export const Post=mongoose.model("Post",PostSchema)
