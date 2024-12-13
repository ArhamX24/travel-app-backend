import mongoose from "mongoose"
import "dotenv/config"

async function dbConnect() {
    await mongoose.connect(process.env.DATABASE_URI)
}

export default dbConnect