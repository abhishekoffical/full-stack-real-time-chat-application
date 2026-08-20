import jwt from 'jsonwebtoken';
import { asyncHandler } from './asynchandler.js';
import { User } from '../models/user.model.js';

export const generatejwtToken=async(user,message,statusCode,res)=>{
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })

    return res
    .status(statusCode)
    .cookie("token",token,{
        httpOnly:true,
        maxAge:process.env.COOKIE_EXPIRE *24*60*60*100,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development"?false:true,
    })
    .json({
        success:true,
        message,
        token
    })

}