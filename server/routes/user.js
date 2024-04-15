import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriends
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";

const userRoutes= express.Router();

//READ
userRoutes.get("/:id",verifyToken,getUser)
userRoutes.get("/:id/friends",verifyToken,getUserFriends)

//UPDATE
userRoutes.patch("/:id/:friendId",verifyToken,addRemoveFriends)
 
export default userRoutes



