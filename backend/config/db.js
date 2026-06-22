import mongoose from 'mongoose';

const connectDB = async () => {
  const localUri = 'mongodb://127.0.0.1:27017/nidula_photography';
  const uri = process.env.MONGO_URI || localUri;

  const opts = {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  };

  try {
    const conn = await mongoose.connect(uri, opts);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);

    if (uri !== localUri) {
      console.warn('Attempting fallback to local MongoDB...');
      try {
        const conn = await mongoose.connect(localUri, opts);
        console.log(`MongoDB Connected (local): ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`Local MongoDB fallback failed: ${fallbackError.message}`);
      }
    }

    console.warn('⚠️  Continuing without MongoDB — data features will not work until DB is available.');
  }
};

export default connectDB;
