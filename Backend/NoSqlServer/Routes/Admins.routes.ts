import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminModel } from "../Models/Admin.model";
import log from "../logs";
import { AuthMiddleware } from "../Middlewares/Auth.middle"
import { rbac } from "../Middlewares/Role.middle";
import { DoctorModel } from "../Models/Doctor.model";
import { CustomerModel } from "../Models/Customer.Schema";

require('dotenv').config();

const AdminRouter = express.Router();

AdminRouter.get('/',(req:Request , res: Response)=>{
  try {
      res.send({msg:'Admin Routes Working Fine'})
  } catch (error) {
      log.error('Admin-Route-Error',error)
      res.send({msg:'Something Went Wrong',error})
  }
})

// Admin Register Logic here  ---Reminder we have to hardcode superadmins here and give access to only super admins using rbac
AdminRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password  } = req.body;
    const adminExist = await AdminModel.findOne({ email });
    if(!name || !email || !password ){
        res
        .status(400)
        .send({msg : 'Please Provide All The Details correctly'})
    }else if(adminExist) {
      res
        .status(400)
        .send({ msg: `Admin already registered with this ${email} id` });
    }else{
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = new AdminModel({ name, email, password: hashedPassword });

      await admin.save();
      
      res.status(200).send({ msg: "Admin Registered successfully" , admin });
    }
  } catch (err) {
    log.info('POST  /admin/register error',err.message)
    res
      .status(500)
      .send({ msg: "something went wrong in registering customer", error: err.message });
  }
});


// Doctor login Logic here 
AdminRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        res
        .status(400)
        .send({msg : 'Please Provide All The Details correctly'})
        return 
    }

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      res.status(400).send({ msg: "Invalid username and password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      res.status(400).send({ msg: "Invalid  password" });
      return;
    }

    const acessToken = jwt.sign({ userID: admin._id , role : admin.role ,email : admin.email}, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1 day",
    });

    const refToken = jwt.sign({userID: admin._id , role : admin.role ,email : admin.email ,status : admin.status}, process.env.JWT_SECRET_REFRESH as string, {
      expiresIn: "2 day",
    });

    res.status(200).send({name : admin.name,email : admin.email, acessToken, refToken });
  } catch (err) {
    log.info('POST /admin/login error',err.message)
    res.status(500).send({ msg: "something went wrong in logging doctor", error: err.message });
  }
});

// Checking if AuthMiddleware is Working Fine
AdminRouter.get('/checkauth',AuthMiddleware,(req : Request , res : Response)=>{
  try {
    res.send({msg : 'Protected Route working Fine ...' , payload : req.body})
  } catch (error) {
    res.status(500).send({ msg: "something went wrong in auth", error: error.message });
  }
})

// Checking if Role Based Access is working fine 
AdminRouter.get('/checkrbac',AuthMiddleware,rbac(['admin']),(req : Request , res : Response)=>{
  try {
    res.send({msg : 'Role based access working Fine ...' , payload : req.body})
  } catch (error) {
    res.status(500).send({ msg: "something went wrong in auth", error: error.message });
  }
})


//Start Writing Routes from here use rbac and authmiddleware if you want 
AdminRouter.use(AuthMiddleware)
AdminRouter.use(rbac(['admin']))

AdminRouter.get('/alldoctors',async (req : Request , res : Response)=>{
    try {
        let doctors = await DoctorModel.find({},{password:0})
      res.status(200).send(doctors)
    } catch (error) {
      res.status(500).send({ msg: "something went wrong in auth", error: error.message });
    }
})

AdminRouter.get('/allcustomers',async (req : Request , res : Response)=>{
    try {
        let customer = await CustomerModel.find({},{password:0})
      res.status(200).send(customer)
    } catch (error) {
      res.status(500).send({ msg: "something went wrong in auth", error: error.message });
    }
})



export { AdminRouter };
