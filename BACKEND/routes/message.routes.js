import express from 'express'
import {IsAuthenticated} from '../middlewares/auth.middleware.js'
import {getAllUsers,getMessages,sendMessage} from '../Controllers/message.controller.js'

const router =express.Router();


router.get("/users",IsAuthenticated,getAllUsers)
router.get("/:id",IsAuthenticated,sendMessage)
router.post("/send/:id",IsAuthenticated,sendMessage)

export default router;