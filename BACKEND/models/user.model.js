import mongoose from "mongoose";


const userSchema= new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
     avatar:{
        public_id:String,
         url:String,
    },
     password:{
        type:String,
        required:true},
      
       
},
     {
        timestamps:true 
         }
);

export const User =mongoose.model("User",userSchema);
