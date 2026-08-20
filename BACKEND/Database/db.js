import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "CHAT_APPLICATION",
    });

    console.log("Database connected");
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
    throw error;
  }
};