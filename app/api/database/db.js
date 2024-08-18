// db.js
import mongoose from 'mongoose';

const dbName = "One_United_Trust";
const dbUrl = `mongodb+srv://abdullah:abdullah@cluster0.drtz9mv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds for server selection
      socketTimeoutMS: 45000, // Timeout after 45 seconds for socket operations
    });
    console.log('MongoDB connected', {});
    return 'MongoDB connected';
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return error;
  }
};

export default connectDB;
