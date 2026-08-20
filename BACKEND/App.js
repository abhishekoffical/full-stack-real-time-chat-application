import express from 'express';
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { dbConnection } from './Database/db.js';
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'


const app=express();


app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "./temp/",
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user",userRouter)
app.use("/api/v1/message",messageRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: err.success || false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});



export default app;
