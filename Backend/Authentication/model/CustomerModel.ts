import mongoose, { Schema, Document } from "mongoose";
interface Customer extends Document {
  name: string;
  email: string;
  password: string;
  AuthStatus?: string[];
  Role: "customer" | "doctor" | "admin";
  Pets?: string[];
  status: boolean;
}

const customerSchema: Schema<Customer> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  Role: {
    type: String,
    enum: ["customer", "doctor", "admin"],
    default: "customer",
  },
  Pets: [{ type: String }],
  status: { type: Boolean, default: true },
});

const Customermodel = mongoose.model<Customer>("customer", customerSchema);
export default Customermodel;
