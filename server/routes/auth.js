import express from 'express'
import {register,login} from '../controllers/auth.js'


const authRoutes =express.Router();
authRoutes.post("/login",login); 

export default authRoutes;

