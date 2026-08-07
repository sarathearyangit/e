import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sarathearyan731_db_user:Sarathe312@cluster0.ppljmuk.mongodb.net/commerce"
    );

    console.log("DB Connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};