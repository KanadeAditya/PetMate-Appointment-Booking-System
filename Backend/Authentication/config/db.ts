import mongoose from "mongoose";

const connection = mongoose.connect(
  "mongodb+srv://yuvraj:yuvraj@cluster0.hhjiny0.mongodb.net/customers?retryWrites=true&w=majority"
);

export default connection;
