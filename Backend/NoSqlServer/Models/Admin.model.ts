import mongoose, { Document } from 'mongoose';

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "SuperAdmin" | "Admin";
  status: boolean;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  name: {
    type: String,
    required: true,
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
  role: {
    type: String,
    required: true,
    enum: ["SuperAdmin", "Admin"],
    default: "Admin",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const AdminModel = mongoose.model<IAdmin>("admin", adminSchema);

export { AdminModel };
