import { Router ,json} from "express"
import db from '../models'
import { v4 as uuidv4 } from 'uuid';
import log from "../logs";
import { Request,Response } from "express";
import { AuthMiddleware } from "../middlewares/Auth.middle";
import { rbac } from "../middlewares/Role.middle";
const { Op } = require("sequelize");

const CustomerRouter = Router()
CustomerRouter.use(AuthMiddleware,rbac(['customer']))

CustomerRouter.get('/',(req : Request,res : Response) : void=>{
    try {
        res.send({msg:'Customer Routes Working Fine'})
    } catch (error) {
        log.error('customer-Route-Error',error)
        res.send({msg:'Something Went Wrong',error})
    }
})

CustomerRouter.post('/book/:SlotID',async (req : Request,res : Response) : Promise<void>=>{
    try {

        let {userID , PetID} = req.body;    
        let {SlotID} = req.params;
        let ifexist = await db.Slot.findAll({
            where: {
                [Op.or] :{
                    SlotID,
                    CustomerID:userID
                }
            }
        })

        if(ifexist.CurrentStatus === "booked"){
            res.send({msg:'Slot has been already booked'})
        }else{
            let slot = await db.Slot.update({ 
                CustomerID:userID,
                PetID,
                CurrentStatus:"booked"
             }, {where: {SlotID}});
    
            res.send({msg:'Slot has been booked or you are at your daily limit, Please empty your slots ',slot})
        }
    } catch (error) {
        log.error('POST /customers/book -Route-Error',error)
        res.send({msg:'Something Went Wrong',error})
    }
})

CustomerRouter.patch('/close/:SlotID',(req : Request,res : Response) : void=>{
    try {

        let {SlotID} = req.params;
        let {CustomerSummary} = req.body
        if(SlotID){
            let update = db.Slot.update({ 
                CurrentStatus:"booked",
                CustomerSummary : CustomerSummary || ""
            }, {
                where: {
                    SlotID
                }
              });
        }else{
            res.send({msg:'Please provide all the details'})
        }
    } catch (error : any) {
        log.error('customer POST /close/:SlotID-Route-Error',error.message)
        res.send({msg:'Something Went Wrong',error})
    }
})

export default CustomerRouter

