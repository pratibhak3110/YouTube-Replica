import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async() => {
    console.log("Connecting to MongoDB...", `${process.env.MONGO_URI}/${DB_NAME}`);
    try{
      const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
      console.log(`MongoDB connected successfully DB HOST: ${connectionInstance.connection.host}`);
    } catch(error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);

//     console.log(
//       `MongoDB Connected: ${conn.connection.host}`
//     );
//   } catch (error) {
//     console.error("MongoDB Error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;