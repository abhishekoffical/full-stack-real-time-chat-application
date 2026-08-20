import { asyncHandler } from "../utils/asynchandler.js"
import {ApiError} from '../utils/apierror.js'
import {User} from '../models/user.model.js'
import {Message} from '../models/message.model.js'
import  {v2 as cloudinary} from "cloudinary" ;
import { io, getReceiverSocketId } from "../utils/Socket.js";

export const getAllUsers=asyncHandler(async(req,res,next)=>{

    const user=req.user;
    const filteredUsers= await User.find({_id:{$ne:user._id}}).select("-password")
    res.status(200).json({
        success:true,
        users:filteredUsers
    })

})
export const getMessages=asyncHandler(async(req,res,next)=>{
    const receiverId =req.params.id;
    const myId =req.user._id;
    const receiver=await User.findById(receiverId)
    if(!receiver){
        throw new ApiError(400,"invalid receiver Id")
    }
    const message =await Message.find({
        $or:[
            {senderId:myId,receiverId:receiverId},
            {senderId:receiverId,receiverId:myId}
        ]
    }).sort({createdAt:1});
    res.status(200).json({
        success:true,
        message,
    })
    
})
export const sendMessage=asyncHandler(async(req,res,next)=>{
    const {text} =req.body;
    const media =req?.files?.media;
    const {id:receiverId} =req.params;
    const senderId= req.user._id;
     const receiver=await User.findById(receiverId);
    if(!receiver){
        throw new ApiError(400,"invalid receiver Id")
    }
    const sanitizedText= text?.trim()|| "";
    if(!sanitizedText &&!media){
        throw new ApiError(400,"can not send empty message")
    }
    let mediaurl="";
    if (media){
       try {
         const uploadResponse=await cloudinary.uploader.upload(
             media.tempFilePath,{
                 resource_type:"auto", //image ya video
                 folder:"CHAT_APP_MEDIA",
                 transformation:[
                     {width:1000,height:1000,crop:"limit"},
                     {quality:"auto"},
                     {fetch_format:"auto"},
                 ]
 
             }
         )
         mediaurl=uploadResponse?.secure_url;
       } catch (error) {
          throw new ApiError(500, "failed to upload media please try after some time");
        
       }
    }
   const newMessage=await Message.create({
    senderId,
    receiverId,
    text:sanitizedText,
    media:mediaurl,
   })


   const receiverSocketId = getReceiverSocketId(receiverId);

if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
}
   res.status(201).json(newMessage

   )
})