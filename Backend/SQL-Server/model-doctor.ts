import mongoose, { Document, Schema, model } from 'mongoose';

interface IAuthStatus extends Document {
  authType: string;
  authToken: string;
}

interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  degree: string[];
  UPRN: string;
  speciality: string[];
  authStatus: IAuthStatus[];
  role: "doctor" | "admin" | "superadmin";
  status: boolean;
}

// const authStatusSchema: Schema = new Schema({
//   authType: { type: String, required: true },
//   authToken: { type: String, required: true },
// });

const doctorSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  degree: [
    {
      type: String,
    },
  ],
  UPRN: {
    type: String,
    required: true,
  },
  speciality: {
    type: [String],
    default : []
  },
  // authStatus: [authStatusSchema],
  role: {
    type: String,
    required: true,
    default: "doctor"
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const DoctorModel = model<IDoctor>("doctor", doctorSchema);
