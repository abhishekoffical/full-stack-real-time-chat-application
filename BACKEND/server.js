import {config} from 'dotenv';
import http from 'http'
import { dbConnection } from "./Database/db.js";
import { initSocket } from './utils/Socket.js';

config({path:"./Config/config.env"});
const { default: app } = await import("./app.js");


const PORT = process.env.PORT || 4000;

const server =http.createServer(app);
initSocket(server);


const startServer = async () => {
  try {
    await dbConnection();

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
