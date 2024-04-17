import jwt from "jsonwebtoken"
import {Request,Response,NextFunction} from "express"
import dotenv from "dotenv"

dotenv.config()
const secret=process.env.SECRETUSER||"admin";
/**
 * 
 * @param {Request} req Original request previus middleware of verification jwt
 * @param {Response} res  Original response previus middleware of verification jwt
 * @param {NextFunction} next next function
 * @returns   response with status 403 if token not found or 500 if token is not valid
 */
const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
   //   check

   const token=req.headers["x-access-token"];

   if(!token){
     return res.status(403).json({message:"token no encontrado"})
   }

   jwt.verify(token as string,secret,(err:any,decoded:any)=>{
    if(err){
      return res.status(500).json({message:"no autorizado"})
    }
    
    next();

   })
  

}

export default verifyToken;