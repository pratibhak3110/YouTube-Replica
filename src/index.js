
import connectDB from "./db/db.js";
import dotenv from "dotenv";

import express from "express";

const app = express();
import dns from 'node:dns/promises';
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config({
    path: "./env"  
});


connectDB()
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
  console.error("Failed to connect to MongoDB. Server not started.");
});
/*
(async ()=> {
    try{
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       app.on('Error', (error)=> {
        console.error("Error connecting to MongoDB:", error);
        throw error;
       })

       app.listen(process.env.PORT, ()=> {
        console.log(`Server is running on port ${process.env.PORT}`);
       })
    } catch(error) {
        console.error("Error connecting to MongoDB:", error);
    }
})()
    */