import mongoose from "mongoose";

require('dotenv').config();

const connection = mongoose.connect(`${process.env.MongoURL}`);

export default connection;