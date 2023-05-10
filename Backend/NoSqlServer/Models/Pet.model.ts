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
  stat: boolean;
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
  status: { type:{reason: String, stat: Boolean},default:{reason:"",stat:true} },
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

export {PetModel}
