import mongoose, { Document } from 'mongoose';

interface IVaccination extends Document {
  name: string;
  date: Date;
}

interface IMedicalHistory extends Document {
  date: Date;
  doctorID: string;
  type: string;
  prescriptions: string;
  symptoms: string;
  diagnosis: string;
}

interface IWeight extends Document {
  date: Date;
  value: number;
}

interface IPet extends Document {
  name: string;
  type: string;
  breed?: string;
  ownerID: string;
  ownerName?: string;
  weight?: IWeight[];
  dob?: Date;
  vaccinations?: IVaccination[];
  status?: { reason?: string; stat?: string };
  medicalHistory?: Map<Date, IMedicalHistory[]>;
}

const vaccinationSchema = new mongoose.Schema<IVaccination>({
  name: String,
  date: Date,
});

const medicalHistorySchema = new mongoose.Schema<IMedicalHistory>({
  doctorID: String,
  type: String,
  prescriptions: String,
  symptoms: String,
  diagnosis: String,
});

const weightSchema = new mongoose.Schema<IWeight>({
  date: Date,
  value: Number,
});

const petSchema = new mongoose.Schema<IPet>({
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

const PetModel = mongoose.model<IPet>('pet', petSchema);

export { PetModel };
