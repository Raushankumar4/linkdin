import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Linkdin",
    });
    console.log(`Mongodb Connected SuccessFully ${instance.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

