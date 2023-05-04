"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModel = void 0;
const mongoose_1 = require("mongoose");
const authStatusSchema = new mongoose_1.Schema({
    authType: { type: String, required: true },
    authToken: { type: String, required: true },
});
const doctorSchema = new mongoose_1.Schema({
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
    },
    authStatus: [authStatusSchema],
    role: {
        type: String,
        required: true,
        default: "doctor",
        enum: ["doctor", "admin", "superadmin"],
    },
    status: {
        type: Boolean,
        default: true,
    },
});
exports.DoctorModel = (0, mongoose_1.model)("doctor", doctorSchema);
