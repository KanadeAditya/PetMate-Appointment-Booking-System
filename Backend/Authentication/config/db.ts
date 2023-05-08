import mongoose from "mongoose";

const connection = mongoose.connect(
  "mongodb+srv://petmate:petmate@cluster1.0vct2ex.mongodb.net/petmate?retryWrites=true&w=majority"
);

export default connection;
