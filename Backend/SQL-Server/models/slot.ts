'use strict';
import {Model,UUID, UUIDV4} from 'sequelize';
import sequelize from 'sequelize/types/sequelize';

interface ISlot {
  SlotID : string;
  PetID : string;
  DoctorID : string;
  Price : number;
  CustomerID : string;
  CurrentStatus : string;
  StartTime : EpochTimeStamp
  EndTime : EpochTimeStamp
  MedicalHistoryStatus : string
  DoctorSummary : string
  CustomerSummary : string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Slot extends Model <ISlot> implements ISlot {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    SlotID !: string;
    PetID !: string;
    DoctorID !: string;
    CustomerID !: string;
    CurrentStatus !: string;
    StartTime !: EpochTimeStamp
    EndTime !: EpochTimeStamp
    MedicalHistoryStatus !: string
    DoctorSummary !: string
    CustomerSummary !: string
    Price !: number 
    static associate(models:any) {
      // define association here
    }
  }
  Slot.init({
    SlotID: {
      type : DataTypes.STRING,
      allowNull:false,
      primaryKey:true,
      defaultValue:UUIDV4
    },
    PetID: {
      type : DataTypes.STRING,
      defaultValue:""
    },
    DoctorID: {
      type : DataTypes.STRING,
      allowNull:false
    },
    CustomerID:{
      type : DataTypes.STRING,
      allowNull:false,
      defaultValue:""
    },
    Price : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    CurrentStatus: {
      type: DataTypes.ENUM,
      values: ['open', 'booked', 'closed'],
      defaultValue:"open",
      allowNull:false,
    },
    StartTime : {
      type:DataTypes.DATE,
      allowNull:false 
    },
    EndTime : {
      type:DataTypes.DATE,
      allowNull:false 
    },
    MedicalHistoryStatus: {
      type : DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    },
    DoctorSummary: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:""
    },
    CustomerSummary:  {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:""
    }
  }, {
    sequelize,
    modelName: 'Slot',
  });
  return Slot;
};