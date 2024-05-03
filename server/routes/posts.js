import express from "express"
import {
    deletePost,
    getFeedPosts,
    getUserPosts,
    likePost
} from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js";


//READ
const postRoutes=express.Router();
postRoutes.get("/",verifyToken,getFeedPosts);
postRoutes.get("/:userId/posts",verifyToken,getUserPosts)
postRoutes.delete("/:id",verifyToken,deletePost)
 


//UPDATE
postRoutes.patch("/:id/like",verifyToken,likePost)

export default postRoutes;