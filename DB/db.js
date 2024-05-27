import app from "../app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const {DB_URI} = process.env

async function run() {
    try {
        await mongoose.connect(DB_URI);

        app.listen(3000, () => {
            console.log("Server is running. Use our API on port: 3000");
        });

        console.info("Database connection successful");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

}
run().catch(err => console.error(err))