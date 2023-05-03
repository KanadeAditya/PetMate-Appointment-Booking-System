import { Router ,json} from "express"
import db from '../models'
const DoctorRouter = Router()
import { v4 as uuidv4 } from 'uuid';

DoctorRouter.get('/',(req,res) : void=>{
    res.send({msg:"Doctors route working fine",slot:uuidv4()})
})

DoctorRouter.get('/slots',async (req,res)=>{
    try {
        // res.send({msg:'working fine .....'})
        let slots = await db.Slot.findAll()

        res.send(slots)

    } catch (error:any) {
        console.log({msg:error.message})
        res.send(error)
    }
})

DoctorRouter.post('/openslot',async (req,res)=>{
    try {
        // res.send({msg:'working fine .....'})
        let {SlotID,PetID,DoctorID,CustomerID} = req.body;
        let slot = await db.Slot.create({
            SlotID:uuidv4(),
            PetID,
            DoctorID,
            CustomerID,
            StartTime:new Date(),
            EndTime:new Date()
        })

        res.send({msg:"Slot Has been Created ",slot})

    } catch (error:any) {
        console.log({msg:error.message})
        res.send(error)
    }
})

export default DoctorRouter