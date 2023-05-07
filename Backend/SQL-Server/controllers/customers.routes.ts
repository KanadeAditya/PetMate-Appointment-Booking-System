import { Router ,json} from "express"
import db from '../models'
import { v4 as uuidv4 } from 'uuid';
import log from "../logs";
import { Request,Response } from "express";
import { AuthMiddleware } from "../middlewares/Auth.middle";
import { rbac } from "../middlewares/Role.middle";

const CustomerRouter = Router()

CustomerRouter.get('/',(req : Request,res : Response) : void=>{
    try {
        res.send({msg:'Customer Routes Working Fine'})
    } catch (error) {
        log.error('customer-Route-Error',error)
        res.send({msg:'Something Went Wrong',error})
    }
})

export default CustomerRouter

