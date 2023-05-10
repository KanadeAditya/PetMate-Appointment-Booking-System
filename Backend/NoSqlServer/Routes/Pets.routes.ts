import express, { Request, Response } from "express";
import log from "../logs";
import { AuthMiddleware } from "../Middlewares/Auth.middle"
import { rbac } from "../Middlewares/Role.middle";
import { PetModel } from '../Models/Pet.model'

let PetRouter = express.Router()

PetRouter.use(AuthMiddleware) // as all pet routes should be protected

PetRouter.get('/', (req: Request, res: Response) => {
    try {
        res.send({ msg: 'Pets Routes Working Fine' })
    } catch (error) {
        log.error('pet-Route-Error', error)
        res.send({ msg: 'Something Went Wrong', error })
    }
})


// There is a minor error in Pet Schema it is not adding all the fields by default , like Medical history is not getting added by default 
PetRouter.post('/add', rbac(['customer']), async (req: Request, res: Response) => {
    try {
        let { name, type, breed, userID, Owner_Name, weight, DoB } = req.body
        if (!name || !type || !breed || !userID || !Owner_Name || !weight || !DoB) {
            res.send({ msg: "Please Provide all the details" })
            return
        }
        let pet = new PetModel({
            name,
            type,
            breed,
            OwnerID: userID,
            Owner_Name,
            weight,
            DoB
        });
        await pet.save();
        res.status(200).send({ msg: 'Pet has been Added', pet });
    } catch (error) {
        log.info('POST pets/add', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})


//Pets update
PetRouter.patch("/update/:id", rbac(["customer", "doctor"]), async (req: Request, res: Response) => {
    try {
        let pet = await PetModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send({ msg: "pet has been updated", pet })
    } catch (error) {
        log.info('PATCH pets/update', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})

//pets delete
PetRouter.patch("/delete/:id", rbac(["customer", "admin"]), async (req: Request, res: Response) => {
    try {
        let pet = await PetModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({ msg: "pet has been delete", pet })
    } catch (error) {
        log.info('PATCH pets/delete', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})


// get medical history of pet
PetRouter.get("/medhistory/:id", rbac(["customer", "doctor"]), async (req: Request, res: Response) => {
    try {
        let medicalHistory = await PetModel.find({ _id: req.params.id }, { Medical_history: 1 })
        res.status(200).send({ msg: "medical history of pet", medicalHistory })
    } catch (error) {
        log.info('GET pets/history', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})


// sort and filter pet's breed
PetRouter.get("/sort", rbac(["admin"]), async (req: Request, res: Response) => {
    try {
        let { sort, breed } = req.query;

        let sortCriteria = {};
        let query = {}

        if (sort) sortCriteria["type"] = +sort;
        if (breed) query["type"] = breed;

        let breedSort = await PetModel.find(query).sort(sortCriteria)

        res.status(200).send({ msg: "medical history of pet", breedSort })
    } catch (error) {
        log.info('GET pets/sort', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})





PetRouter.get('/allpets', async (req: Request, res: Response) => {
    try {
        let pet = await PetModel.find()
        res.status(200).send(pet)
    } catch (error) {
        log.info('Pet-route-error', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})



PetRouter.get('/mypets/:id', async (req: Request, res: Response) => {

    try {
        let {id} = req.params
        let pet = await PetModel.find({
            OwnerID : id
        })
        res.status(200).send(pet)
    } catch (error) {
        log.info('Pet-route-error', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})


PetRouter.patch("/medhistory/:id", rbac(["doctor"]), async (req: Request, res: Response) => {
    try {
        let { userID, type, prescriptions, symptoms, Diagnosis } = req.body;
        if (!type || !prescriptions || !symptoms || !Diagnosis) {
            res.send({ msg: "Please provide all the details" })
        }
        let medicalHistory = await PetModel.findByIdAndUpdate({ _id: req.params.id }, {
            Medical_history: {
                doctorID: userID,
                type,
                prescriptions,
                symptoms,
                Diagnosis
            }
        })
        res.status(200).send({ msg: "medical history of pet has been updated", medicalHistory: { type, prescriptions, symptoms, Diagnosis } })
    } catch (error) {
        log.info('GET pets/history', error)
        res.status(500).send({ msg: "something went wrong in route", error: error.message });
    }
})

export { PetRouter }