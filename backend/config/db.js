import mongoose from 'mongoose';

const connectDB = async () => {
  const localUri = 'mongodb://127.0.0.1:27017/nidula_photography';
  const uri = process.env.MONGO_URI || localUri;

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);

    if (uri !== localUri) {
      console.warn('Attempting fallback to local MongoDB...');
      try {
        const conn = await mongoose.connect(localUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`Local MongoDB fallback failed: ${fallbackError.message}`);
      }
    }

    console.warn('Continuing without MongoDB');
    // process.exit(1); // Removed to allow server to run without DB
  }
};

export default connectDB;
