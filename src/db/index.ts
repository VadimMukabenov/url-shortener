import mongoose from 'mongoose';

export const connectDB = async (connectionString: string) => {
    try {
        await mongoose.connect(connectionString);
        console.log('Database Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
