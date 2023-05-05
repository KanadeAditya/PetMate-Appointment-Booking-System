import mongoose, { Document, Schema, model } from 'mongoose';

interface IAuthStatus {
  authType: string;
  authToken: string;
}

interface ICustomer extends Document {
  name: string;
  email: string;
  password: string;
  authStatus: IAuthStatus[];
  role: 'customer' ;
  status: boolean;
}

const authStatusSchema = new Schema({
  authType: { type: String, required: true },
  authToken: { type: String, required: true },
});

const customerSchema = new Schema({
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
  authStatus: [authStatusSchema],
  role: {
    type: String,
    required: true,
    default: 'customer',
    enum: ['customer', 'doctor', 'admin', 'superadmin'],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const CustomerModel = model<ICustomer>('customer', customerSchema);

export { CustomerModel, ICustomer, IAuthStatus };
