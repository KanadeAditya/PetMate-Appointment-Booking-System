"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = require("mongoose");
const authStatusSchema = new mongoose_1.Schema({
    authType: { type: String, required: true },
    authToken: { type: String, required: true },
});
const customerSchema = new mongoose_1.Schema({
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
const CustomerModel = (0, mongoose_1.model)('customer', customerSchema);
exports.CustomerModel = CustomerModel;
