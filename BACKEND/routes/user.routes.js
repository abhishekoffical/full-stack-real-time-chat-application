import express from 'express'
import{signin,signout,signup,getUser,updateProfile} from '../Controllers/user.controller.js'
import {IsAuthenticated } from '../middlewares/auth.middleware.js';


const router=express.Router();


router.post("/sign-up",signup);
router.post("/sign-in",signin);
router.get("/sign-out",IsAuthenticated,signout);
router.put("/update-profile",IsAuthenticated,updateProfile);
router.get("/you",IsAuthenticated,getUser);




export default router;