"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vaccinationSchema = new mongoose_1.default.Schema({
    name: String,
    date: Date,
});
const medicalHistorySchema = new mongoose_1.default.Schema({
    doctorID: String,
    type: String,
    prescriptions: String,
    symptoms: String,
    diagnosis: String,
});
const weightSchema = new mongoose_1.default.Schema({
    date: Date,
    value: Number,
});
const petSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    breed: String,
    ownerID: {
        type: String,
        required: true,
    },
    ownerName: String,
    weight: [weightSchema],
    dob: Date,
    vaccinations: [vaccinationSchema],
    status: {
        reason: String,
        stat: String,
    },
    medicalHistory: {
        type: Map,
        of: [medicalHistorySchema],
    },
});
const PetModel = mongoose_1.default.model('pet', petSchema);
exports.PetModel = PetModel;
