const mongoose = require("mongoose");
const db = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DATABASE_NAME;

mongoose.set("strictQuery", true, "useNewUrlParser", true);
const connectDB = async () => {
  try {
    await mongoose.connect(db, { dbName });
    console.log("MongoDB is Connected to the database :", dbName);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
