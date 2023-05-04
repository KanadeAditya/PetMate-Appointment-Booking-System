import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerModel } from "../Models/Customer.Schema";
import log from "../logs";
import { AuthMiddleware } from "../Middlewares/Auth.middle"
import { rbac } from "../Middlewares/Role.middle";

require('dotenv').config();

const CustomerRouter = express.Router();

CustomerRouter.get('/',(req:Request , res: Response)=>{
  try {
      res.send({msg:'Customer Routes Working Fine'})
  } catch (error) {
      log.error('customer-Route-Error',error)
      res.send({msg:'Something Went Wrong',error})
  }
})

// User Register Logic here 
CustomerRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await CustomerModel.findOne({ email });
    if(!name || !email || !password){
      res
      .status(400)
      .send({msg : 'Please Provide All The Details correctly'})
    }else if (userExist) {
      res
        .status(400)
        .send({ msg: `Customer already registered with this ${email} id` });
    }else{
      const hashedPassword = await bcrypt.hash(password, 10);

      const customer = new CustomerModel({ name, email, password: hashedPassword });

      await customer.save();
      
      res.status(200).send({ msg: "Customer Registered successfully" , customer });
    }
  } catch (err) {
    log.info('POST /register error',err.message)
    res
      .status(500)
      .send({ msg: "something went wrong in registering customer", error: err.message });
  }
});


// User login Logic here 
CustomerRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      res
      .status(400)
      .send({msg : 'Please Provide All The Details correctly'})
      return 
    }

    const user = await CustomerModel.findOne({ email });

    if (!user) {
      res.status(400).send({ msg: "Invalid username and password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).send({ msg: "Invalid username or password" });
      return;
    }

    const acessToken = jwt.sign({ userID: user._id , role : user.role ,email : user.email}, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1 day",
    });

    const refToken = jwt.sign({userID: user._id , role : user.role ,email : user.email ,status : user.status}, process.env.JWT_SECRET_REFRESH as string, {
      expiresIn: "2 day",
    });

    res.status(200).send({name : user.name,email : user.email, acessToken, refToken });
  } catch (err) {
    log.info('POST /login error',err.message)
    res.status(500).send({ msg: "something went wrong in logging user", error: err.message });
  }
});

// Checking if AuthMiddleware is Working Fine
CustomerRouter.get('/checkauth',AuthMiddleware,(req : Request , res : Response)=>{
  try {
    res.send({msg : 'Protected Route working Fine ...' , payload : req.body})
  } catch (error) {
    res.status(500).send({ msg: "something went wrong in auth", error: error.message });
  }
})

// Checking if Role Based Access is working fine 
CustomerRouter.get('/checkrbac',AuthMiddleware,rbac(['customer']),(req : Request , res : Response)=>{
  try {
    res.send({msg : 'Role based access working Fine ...' , payload : req.body})
  } catch (error) {
    res.status(500).send({ msg: "something went wrong in auth", error: error.message });
  }
})

//Start Writing Routes from here use rbac and authmiddleware if you want 


export { CustomerRouter };
