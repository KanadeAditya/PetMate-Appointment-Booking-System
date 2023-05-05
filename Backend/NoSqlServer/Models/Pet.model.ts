import mongoose, { Document } from "mongoose";

interface Weight {
  date: Date;
  value: number;
}
interface vacc {
  name: number;
  date: Date;
}
interface Status {
  reason: string;
  stat: string;
}

interface date {
  doctorID: string;
  type: string;
  prescriptions: string;
  symptoms: string;
  Diagnosis: string;
}

interface Ipets extends Document {
  name: string;
  type: string;
  breed: string;
  OwnerID: string;
  Owner_Name: string;
  weight: Weight;
  DoB: Date;
  Vaccinations: vacc[];
  status: Status;
  Medical_history?: Map<Date, date>;
}

const petSchema = new mongoose.Schema<Ipets>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String  },
  OwnerID: { type: String, required: true },
  Owner_Name: { type: String  },
  weight: { date: Date, value: Number },
  DoB: { type: Date },
  Vaccinations: [{ name: String, date: Date }],
  status: { type:{reason: String, stat: Boolean},default:{} },
  Medical_history: {
  type: Map,
  default:{},
    of: {
      type: {
        doctorID: String,
        type: String,
        prescriptions: String,
        symptoms: String,
        Diagnosis: String,
      },
    },
  },
});


const PetModel = mongoose.model<Ipets>('pet', petSchema);
// interface IVaccination extends Document {
//   name: string;
//   date: Date;
// }

// interface IMedicalHistory extends Document {
//   date: Date;
//   doctorID: string;
//   type: string;
//   prescriptions: string;
//   symptoms: string;
//   diagnosis: string;
// }

// interface IWeight extends Document {
//   date: Date;
//   value: number;
// }

// interface IPet extends Document {
//   name: string;
//   type: string;
//   breed?: string;
//   ownerID: string;
//   ownerName?: string;
//   weight?: IWeight[];
//   dob?: Date;
//   vaccinations?: IVaccination[];
//   status?: { reason?: string; stat?: string };
//   medicalHistory?: Map<Date, IMedicalHistory[]>;
// }

// const vaccinationSchema = new mongoose.Schema<IVaccination>({
//   name: String,
//   date: Date,
// });

// const medicalHistorySchema = new mongoose.Schema<IMedicalHistory>({
//   doctorID: String,
//   type: String,
//   prescriptions: String,
//   symptoms: String,
//   diagnosis: String,
// });

// const weightSchema = new mongoose.Schema<IWeight>({
//   date: Date,
//   value: Number,
// });

// const petSchema = new mongoose.Schema<IPet>({
//   name: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
//   breed: String,
//   ownerID: {
//     type: String,
//     required: true,
//   },
//   ownerName: String,
//   weight: [weightSchema],
//   dob: Date,
//   vaccinations: [vaccinationSchema],
//   status: {
//     reason: String,
//     stat: String,
//   },
//   medicalHistory: {
//     type: Map,
//     of: [medicalHistorySchema],
//   },
// });

// const PetModel = mongoose.model<IPet>('pet', petSchema);

export { PetModel };
