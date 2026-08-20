import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js'
import { asyncHandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/apierror.js';



export const IsAuthenticated=asyncHandler(async(req,res,next)=>{
    
    let decode;
     try {
    const {token}=req.cookies;
    if(!token){
        throw new ApiError(400,"user not sign in or expired. please sign in.")}
         decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
       
   
            if(!decode){
                throw new ApiError(400,"user not found .please sign in")
    
            }}
            catch(err){
                throw new ApiError(401,"invalid token")
            }
            const user=await User.findById(decode.id);
            if(!user){
                throw new ApiError(400,"user not found .please sign in")
            }
          req.user=user;
          next();
    
 
    })