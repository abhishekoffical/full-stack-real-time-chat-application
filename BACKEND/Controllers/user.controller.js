import { asyncHandler } from "../utils/asynchandler.js"
import {ApiError} from '../utils/apierror.js'
import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generatejwtToken } from "../utils/jwtToken.js"
import cloudinary from "../Config/cloudinary.js";

const signup=asyncHandler(async(req,res,next)=>{
const {fullName,email,password}=req.body;
if(!fullName||!email||!password){
    throw new ApiError(400,"all fields are required")
}
 const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)){
    throw new ApiError(400,"please enter valid emailid")
}

if(password.length <8 ||password.length>15){
    throw new ApiError(400,"please enter password between length 8 to 15")
}
 
const isEmailExisted=await User.findOne({email});

if(isEmailExisted){
    throw new ApiError(400,"email id already exist")
    
}

const HashPassword=await bcrypt.hash(password,10);

const user=await User.create({
    fullName,
    email,
    password:HashPassword,
    avatar:{
        public_id:"",
        url:"",
    },
})

 generatejwtToken(user,"user registered successfully",201,res);

})
const signin=asyncHandler(async(req,res,next)=>{

    const {email,password}=req.body;
     
    if(!email||!password){
        throw new ApiError(400,"please enter email and password both")
    }
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if(!emailRegex.test(email)){
    throw new ApiError(400,"please enter valid emailid")
}
 const user= await User.findOne({email});
    if(!user){
        throw new ApiError(400,"user not found or you have entered wrong email or please first register")
    }

    const IsPasswordMatched=await bcrypt.compare(password,user.password)
    if(!IsPasswordMatched){
        throw new ApiError(400,"you have entered wrong password"
        )
    }
    generatejwtToken(user,"user logged in successfully",200,res);
})
const signout=asyncHandler(async(req,res,next)=>{

    return res
    .status(200)
    .cookie("token","",{
        httpOnly:true,
        maxAge:0,
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development"?false:true,
    })
    .json({
        success:true,
        message:"logged out successfull"
        
    })

})
const getUser=asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        throw new ApiError(400,"user not found")
    }
    res.status(200).json({
        success:true,
        user,
    })
})
const updateProfile=asyncHandler(async(req,res,next)=>{
    const {fullName,email}=req.body;
    if(fullName?.trim().length===0||email?.trim().length===0){
        throw new ApiError(400,"name or email can't be empty")
    } 
    const avatar=req?.files?.avatar;
    
    let cloudinaryResponse={};
    if(avatar){
        try {
           
            const oldAvatarPublicId=req.user?.avatar?.public_id;
            if(oldAvatarPublicId && oldAvatarPublicId.length>0){
                await cloudinary.uploader.destroy(oldAvatarPublicId)
            }
            cloudinaryResponse=await cloudinary.uploader.upload(
                avatar.tempFilePath,{
                    folder:"CHAT_APP_USERS_AVATARS",
                    transformation:[
                        {width:300,height:300,crop:"limit"},
                        {quality:"auto"},
                        {fetch_format:"auto"}
                    ],
                }
            )
          
    } catch (error) {
       
        throw new ApiError(400, "failed to upload avatar");
    }
    }
    let data={
        fullName,
        email,
    }
    if (avatar &&cloudinaryResponse?.public_id && cloudinaryResponse?.secure_url){
   data.avatar={
    public_id: cloudinaryResponse.public_id,
    url:cloudinaryResponse.secure_url,
   }
    }
    let user = await User.findByIdAndUpdate(req.user._id,data,{
         returnDocument: 'after',
        runValidators:true,
        

    })
    const userResponse = user.toObject();
   delete userResponse.password;

    res.status(200).json({
        success:true,
        message:"profile updated successfully",
        user:userResponse,
    })
})


export{signin,signout,signup,getUser,updateProfile}