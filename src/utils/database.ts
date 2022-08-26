import mongoose from 'mongoose'

export const connectDatabase = async () => mongoose.connect(process.env.MONGODB_URI!)
