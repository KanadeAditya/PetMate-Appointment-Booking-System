import express, { Request, Response } from "express";
import log from "../logs";
import { AuthMiddleware } from "../Middlewares/Auth.middle"
import { rbac } from "../Middlewares/Role.middle";
import {PetModel} from '../Models/Pet.model'

let PetRouter = express.Router()

PetRouter.use(AuthMiddleware) // as all pet routes should be protected

PetRouter.get('/',(req:Request , res: Response)=>{
    try {
        res.send({msg:'Pets Routes Working Fine'})
    } catch (error) {
        log.error('pet-Route-Error',error)
        res.send({msg:'Something Went Wrong',error})
    }
})


// There is a minor error in Pet Schema it is not adding all the fields by default , like Medical history is not getting added by default 
PetRouter.post('/add',rbac(['customer']),async (req : Request , res : Response)=>{
    try {
        let {name,userID,type} = req.body
        let pet = new PetModel({name,ownerID:userID,type})
        await pet.save();
        res.status(200).send({msg : 'Pet has been Added'})
    } catch (error) {
        log.info('Pet-route-error',error)
      res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})

PetRouter.get('/allpets',rbac(['admin']),async (req : Request , res : Response)=>{
    try {
        let pet =await PetModel.find()
        res.status(200).send(pet)
    } catch (error) {
        log.info('Pet-route-error',error)
      res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})




export {PetRouter}