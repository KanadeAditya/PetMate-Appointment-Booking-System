import { Router, json } from "express"
import db from '../models'
import { Request,Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import log from "../logs";
import { AuthMiddleware } from "../middlewares/Auth.middle";
import { rbac } from "../middlewares/Role.middle";
import { up } from "../migrations/20230503202742-create-slot";
import { Op } from "sequelize";

const DoctorRouter = Router()
DoctorRouter.use(AuthMiddleware,rbac(["doctor"]))


DoctorRouter.get('/', (req:Request, res:Response): void => {
    res.send({ msg: "Doctors route working fine", slot: uuidv4() })
})

DoctorRouter.get('/slots', async (req, res) => {
    try {
        // res.send({msg:'working fine .....'})
        let slots = await db.Slot.findAll()

        res.send(slots)

    } catch (error: any) {
        log.info(`doctors/slots -error :- ${error.message}`)
        res.send(error)
    }
})


DoctorRouter.get('/myslots', async (req:Request, res:Response) => {
    try {
        // res.send({msg:'working fine .....'})
        let {userID} = req.body
        let slots = await db.Slot.findAll({
           where :{
                DoctorID : userID
           }
        })

        res.send(slots)

    } catch (error: any) {
        log.info(`doctors/slots -error :- ${error.message}`)
        res.send(error)
    }
})

DoctorRouter.post('/openslot', async (req:Request, res:Response) => {
    try {
        let { userID, date, Price , slotDuration } = req.body
        // console.log(new Date(Date.now()))
        // res.send({date : new Date(date)})
        // return 
        // date = Date.now()
        // let ifexist = await db.Slot.findAll({
        //     where: {
        //         [Op.and] :{
        //             DoctorID:userID,
        //             StartTime:{
        //                 [Op.like] : `${new Date(date).toISOString().slice(0,11)}%`
        //             }
        //         }
        //     }
        // })    
        // console.log(new Date(date).toString().slice(0,11))
        // if(ifexist.length >3){
        //     res.send({msg : "Doctor cant open more than 3 slots per Day"})
        //     return 
        // }
        let check = new Date(Date.now()).setDate(new Date(date).getDate() + 7)
        if(check > Date.now()){
            let slot = await db.Slot.create({
                SlotID: uuidv4(),
                DoctorID: userID,
                StartTime: new Date(date).toISOString(),
                EndTime: new Date(new Date(date).setMinutes(new Date(date).getMinutes() + slotDuration)).toISOString(),
                Price
            })
            res.send({msg: 'The slot has been created',slot})
        }else{
            res.send({msg : "You cant book slots more than 7 days in future" })
        }
    } catch (error:any) {
        log.info(`doctors/openslot -error :- ${error.message}`)
        res.send(error)
    }
   
})


DoctorRouter.patch('/close/:SlotID',(req : Request,res : Response) : void=>{
    try {

        let {SlotID} = req.params;
        let {DoctorSummary} = req.body
        if(SlotID && DoctorSummary){
            let update = db.Slot.update({ 
                CurrentStatus:"closed",
                DoctorSummary
            }, {
                where: {
                    SlotID
                }
              });
              res.send({msg:'Slot has been closed', summary : update.DoctorSummary})
        }else{
            res.send({msg:'Please provide all the details'})
        }
    } catch (error : any) {
        log.error('customer POST /close/:SlotID-Route-Error',error.message)
        res.send({msg:'Something Went Wrong',error})
    }
})


export default DoctorRouter



// DoctorRouter.get('/myslots', async (req:Request, res:Response) => {
//     let token = req.headers?.authorization as string
//     let secret = process.env.JWT_SECRET_KEY as string
//     try {
//        let decoded = jwt.verify(token,secret) 
//        let userID = (decoded as JwtPayload).userID;       
//        console.log(decoded)

//        // let {userID} = req.body
//        let slots = await db.Slot.findAll({
//            where :{
//                DoctorID :userID
               
//             }
//         })
//         // res.send({msg:'working fine .....'})

//         res.send(slots)

//     } catch (error: any) {
//         log.info(`doctors/slots -error :- ${error.message}`)
//         res.send(error)
//     }
// })



// import jwt,{JwtPayload} from "jsonwebtoken";
// import * as dotenv from "dotenv"
// dotenv.config()