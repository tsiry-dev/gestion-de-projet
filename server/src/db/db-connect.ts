import { config } from '@/config/app.config';
import mongoose from 'mongoose';

export async function connectToDB(): Promise<void> {
    try {

        await mongoose.connect(config.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            maxPoolSize: 15,
        });

        console.log(
            `MongoDB connected (${config.NODE_ENV})`
        );

    } catch (error) {

        console.error(
            "MongoDB connection failed:",
            error
        );

        process.exit(1); // ❌ stop propre du serveur

    }
}