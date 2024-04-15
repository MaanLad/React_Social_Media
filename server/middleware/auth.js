import jwt from "jsonwebtoken"

export const verifyToken=async(req,res,next)=>{
    try{
         let token=req.header("Authorization")
        // let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWNiODNhZDY0YzVmMzk4NmNlYzMzMyIsImlhdCI6MTcxMzE1ODIzOH0.3jopqqsKYGZfu4U6R_aFAxOIx_TJz51-dBq9kJxY_W4"
         if(!token){
            return res.status(403).send("Access denied")
         }
        
         if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
         }
         const verified=jwt.verify(token,process.env.JWT_SECRET)
        req.user=verified;
        next();
    }catch(err){
        res.status(500).json({error:err.message})
    }
}