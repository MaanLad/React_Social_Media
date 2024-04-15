import express from "express"
import bodyParser from "body-parser"
import multer from "multer"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import mongoose from "mongoose"
import {fileURLToPath} from 'url'
import morgan from "morgan";
import path from 'path'
import {register} from './controllers/auth.js'
import authRoutes from './routes/auth.js'
import { verifyToken } from "./middleware/auth.js"
import userRoutes from "./routes/user.js"
import postRoutes from "./routes/posts.js"
import { createPost } from "./controllers/posts.js"

// CONFIGURATION (Middleware) runs in between 
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config()
const app=express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"})); 
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));


// FILE STORAGE 
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})
const upload=multer({storage});  



// ROUTES WITH FILES
//we're not using the route here for register cause we want to upload the picture from here 
app.post("/auth/register",upload.single("picture"), register);
app.post("/posts",verifyToken,upload.single("picture"),createPost);

// Routes 
app.use('/auth',authRoutes);

app.use('/user',userRoutes)

app.use('/posts',postRoutes); 


// MONGOOSE SETUP 
const PORT =process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server connected at port : ${PORT}`);
    })
}).catch((err)=>{
    console.log(`${err} did not connect`);
})
