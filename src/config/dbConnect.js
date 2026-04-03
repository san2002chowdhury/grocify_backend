import mongoose from "mongoose";
import dotenv from "dotenv/config";

const dbUrl = process.env.URL;

async function dbConnect() {
    try {
        await mongoose.connect(dbUrl);
        console.log("<========Database connected successfully!========>");
    }
    catch (e) {
        console.log("<======Cannot conntect to the Database!======>");
        console.log(e);
    }
}

export default dbConnect;