import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerModel } from "../Models/Customer.Schema";
import log from "../logs";
import { AuthMiddleware } from "../Middlewares/Auth.middle"
import { rbac } from "../Middlewares/Role.middle";
import { DoctorModel } from "../Models/Doctor.model";
// import nodemailer from "nodemailer"
// import otpGenerator from "otp-generator"
import { BlacklistToken } from "../Middlewares/blacklisting";

require('dotenv').config();

const CustomerRouter = express.Router();

CustomerRouter.get('/', (req: Request, res: Response) => {
  try {
    res.send({ msg: 'Customer Routes Working Fine' })
  } catch (error) {
    log.error('customer-Route-Error', error)
    res.send({ msg: 'Something Went Wrong', error })
  }
})


//email verification
// CustomerRouter.post("/emailVerify", async  (req:Request, res:Response) =>{
//   try {
//     const otp = otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

//     const {email} = req.body

//             // create a transporter object using SMTP transport
//             let transporter = nodemailer.createTransport({
//               service: 'gmail',
//               auth: {
//                   user: process.env.nodemailerEmail,
//                   pass: process.env.nodemailerPass
//               }
//           });


//           // create an email message
//           const mailOptions = {
//               from: process.env.nodemailerEmail,
//               to: email,
//               subject: "Verification OTP",
//               text: `Your OTP is ${otp}`
//           };


//           // send the email message
//           transporter.sendMail(mailOptions, (error, info) => {
//               if (error) {
//                   console.log(error);
//                   // res.send({ "msg": error.message })
//               } else {
//                   console.log(`Email sent: ${info.response}`);
//               }
//           });
//   } catch (err) {
//     log.info('POST customers/emailVerify error',err.message)
//     res
//       .status(500)
//       .send({ msg: "something went wrong in registering customer", error: err.message });
//   }
// })

// User Register Logic here 
CustomerRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await CustomerModel.findOne({ email });
    if (!name || !email || !password) {
      res
        .status(400)
        .send({ msg: 'Please Provide All The Details correctly' })
    } else if (userExist) {
      res
        .status(400)
        .send({ msg: `Customer already registered with this ${email} id` });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const customer = new CustomerModel({ name, email, password: hashedPassword });

      await customer.save();

      res.status(200).send({ msg: "Customer Registered successfully", customer });
    }
  } catch (err) {
    log.info('POST customers/register error', err.message)
    res
      .status(500)
      .send({ msg: "something went wrong in registering customer", error: err.message });
  }
});


// User login Logic here 
CustomerRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .send({ msg: 'Please Provide All The Details correctly' })
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

    const acessToken = jwt.sign({ userID: user._id, status: user.status, role: user.role, email: user.email }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1 day",
    });

    const refToken = jwt.sign({ userID: user._id, role: user.role, email: user.email, status: user.status }, process.env.JWT_SECRET_REFRESH as string, {
      expiresIn: "2 day",
    });

    res.status(200).send({ msg: "login successful", userID: user._id, name: user.name, email: user.email, acessToken, refToken, role: 'customer' });
  } catch (err) {
    log.info('POST customers/login error', err.message)
    res.status(500).send({ msg: "something went wrong in logging user", error: err.message });
  }
});

CustomerRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    let { at, rt } = req.body

    await BlacklistToken(`${at}`, 86400)
    await BlacklistToken(`${rt}`, 86400)
    // await client.set("refToken","blacklisted")
    res.status(200).send({ msg: "Logout Successfull", at, rt })

  } catch (error) {
    log.error(`Customer-Logout-error :- ${error}`)
    res.status(500).send({ msg: "something went wrong in auth", error });
  }
})

// Checking if AuthMiddleware is Working Fine
CustomerRouter.get('/checkauth', AuthMiddleware, (req: Request, res: Response) => {
  try {
    res.send({ msg: 'Protected Route working Fine ...', payload: req.body })
  } catch (error) {
    res.status(500).send({ msg: "something went wrong in auth", error: error.message });
  }
})

// Checking if Role Based Access is working fine 
CustomerRouter.get('/checkrbac', AuthMiddleware, rbac(['customer']), (req: Request, res: Response) => {
  try {
    res.send({ msg: 'Role based access working Fine ...', payload: req.body })
  } catch (error) {
    res.status(500).send({ msg: "something went wrong in auth", error: error.message });
  }
})

//Start Writing Routes from here use rbac and authmiddleware if you want 






//<<<<<<<<<<<<<<<<<<----------------------find doctors--------------------->>>>>>>>>>>>>>>>>>>>>>>

CustomerRouter.get("/search", async (req: Request, res: Response) => {
  const name = req.query.name ? String(req.query.name) : '';
  try {
    const regex = new RegExp(name, 'i'); // create a case-insensitive regular expression
    let doctor = await DoctorModel.find({ name: { $regex: regex } });
    console.log(doctor)
    res.send("ok")
  } catch (error) {
    console.log(error)
    res.send("err")
  }
})


//<<<<<<<<<<<<<<-----------------------sort and find------------------>>>>>>>>>>>>>>>



CustomerRouter.get("/department", async (req: Request, res: Response) => {
  const name = req.query.name ? String(req.query.name) : '';
  const Sort = req.query.sort ? req.query.sort : -1;

  try {
    // const regex = new RegExp(name, 'i'); // create a case-insensitive regular expression
    let doctor
    if (Sort == "1") {

      doctor = await DoctorModel.aggregate([{ $match: { name: { $regex: name, $options: 'i' } } }, { $sort: { name: 1 } }])
    } else {
      doctor = await DoctorModel.aggregate([{ $match: { name: { $regex: name, $options: 'i' } } }, { $sort: { name: -1 } }])
    }
    console.log(doctor)
    res.send("ok")
  } catch (error) {
    console.log(error)
    res.send("err")
  }
})
export { CustomerRouter };
