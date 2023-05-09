import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DoctorModel } from "../Models/Doctor.model";
import log from "../logs";
import { AuthMiddleware } from "../Middlewares/Auth.middle"
import { rbac } from "../Middlewares/Role.middle";
import { BlacklistToken } from "../Middlewares/blacklisting"; 

require('dotenv').config();

const DoctorRouter = express.Router();

DoctorRouter.get('/',(req:Request , res: Response)=>{
  try {
      res.send({msg:'Doctor Routes Working Fine'})
  } catch (error) {
      log.error('Doctor-Route-Error',error)
      res.send({msg:'Something Went Wrong',error})
  }
})

// Doctor Register Logic here 
DoctorRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password ,UPRN } = req.body;
    const docExist = await DoctorModel.findOne({ email });
    if(!name || !email || !password || !UPRN){
        res
        .status(400)
        .send({msg : 'Please Provide All The Details correctly'})
    }else if(docExist) {
      res
        .status(400)
        .send({ msg: `Doctor already registered with this ${email} id` });
    }else{
      const hashedPassword = await bcrypt.hash(password, 10);

      const doctor = new DoctorModel({ name, email,UPRN, password: hashedPassword });

      await doctor.save();
      
      res.status(200).send({ msg: "Doctor Registered successfully" , doctor });
    }
  } catch (err) {
    log.info('POST  /doctors/register error',err.message)
    res
      .status(500)
      .send({ msg: "something went wrong in registering customer", error: err.message });
  }
});


// Doctor login Logic here 
DoctorRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        res
        .status(400)
        .send({msg : 'Please Provide All The Details correctly'})
        return 
    }

    const doc = await DoctorModel.findOne({ email });

    if (!doc) {
      res.status(400).send({ msg: "Invalid username and password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, doc.password);

    if (!passwordMatch) {
      res.status(400).send({ msg: "Invalid  password" });
      return;
    }

    const acessToken = jwt.sign({ userID: doc._id,status : doc.status , role : doc.role ,email : doc.email}, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1 day",
    });

    const refToken = jwt.sign({userID: doc._id , role : doc.role ,email : doc.email ,status : doc.status}, process.env.JWT_SECRET_REFRESH as string, {
      expiresIn: "2 day",
    });

    res.status(200).send({msg:"login successful",userID: doc._id,name : doc.name,email : doc.email, acessToken, refToken ,role:"doctor"});
  } catch (err) {
    log.info('POST /doctors/login error',err.message)
    res.status(500).send({ msg: "something went wrong in logging doctor", error: err.message });
  }
});

DoctorRouter.post('/logout',async (req: Request, res: Response) => {
  try {
    let {at,rt} = req.body
    
    await BlacklistToken(`${at}`,86400)
    await BlacklistToken(`${rt}`,86400)
    // await client.set("refToken","blacklisted")
    res.status(200).send({msg:"Logout Successfull",at,rt})

  } catch (error) {
    log.error(`Customer-Logout-error :- ${error}`)
    res.status(500).send({ msg: "something went wrong in auth", error });
  }
})

//Route for adding qulification and speciality of doctor
DoctorRouter.patch('/speciality',AuthMiddleware,rbac(['doctor']), async (req: Request, res: Response) => {
  try {
    const { degree, speciality } = req.body;
    let obj={};
    if(degree)obj["degree"]=degree;
    if(speciality)obj["speciality"]=speciality;
    

    // if (!degree || !speciality) {
    //   res.status(400).send({ msg: 'Please provide all the details correctly' });
    //   return;
    // }

    const doctorId = req.body.userID;
  
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(

      {_id:doctorId},
      // update,
      obj,

      { new: true } // to get the updated document in the response
    );
// res.send("ok")
    res.status(200).send({ msg: 'Doctor info updated successfully', doctor: updatedDoctor });
  } catch (err) {
    res.status(500).send({ msg: 'Something went wrong in updating doctor info', error: err.message });
  }
});





export { DoctorRouter };
