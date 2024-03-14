import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
const connectDb = async () => {
  try {
    const connetionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n mongoose connect !! DB HOST : ${connetionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`mongoo db connection err ${error}`);
    process.exit(1);
  }
};
export default connectDb;
