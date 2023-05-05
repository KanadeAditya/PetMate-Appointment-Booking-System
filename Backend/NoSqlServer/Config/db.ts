import mongoose from "mongoose";

require('dotenv').config();

const connection = mongoose.connect(process.env.URL);

export default connection;