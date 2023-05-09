import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminModel } from "../Models/Admin.model";
import log from "../logs";
import { AuthMiddleware } from "../Middlewares/Auth.middle";
import { rbac } from "../Middlewares/Role.middle";
import { DoctorModel } from "../Models/Doctor.model";
import { CustomerModel } from "../Models/Customer.Schema";
import { PetModel } from "../Models/Pet.model";
import { BlacklistToken } from "../Middlewares/blacklisting";

require("dotenv").config();

const AdminRouter = express.Router();

AdminRouter.get("/", (req: Request, res: Response) => {
  try {
    res.send({ msg: "Admin Routes Working Fine" });
  } catch (error) {
    log.error("Admin-Route-Error", error);
    res.send({ msg: "Something Went Wrong", error });
  }
});

// Admin Register Logic here  ---Reminder we have to hardcode superadmins here and give access to only super admins using rbac
AdminRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const adminExist = await AdminModel.findOne({ email });
    if (!name || !email || !password) {
      res.status(400).send({ msg: "Please Provide All The Details correctly" });
    } else if (adminExist) {
      res
        .status(400)
        .send({ msg: `Admin already registered with this ${email} id` });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = new AdminModel({ name, email, password: hashedPassword });

      await admin.save();

      res.status(200).send({ msg: "Admin Registered successfully", admin });
    }
  } catch (err) {
    log.info("POST  /admin/register error", err.message);
    res
      .status(500)
      .send({
        msg: "something went wrong in registering customer",
        error: err.message,
      });
  }
});

// Doctor login Logic here
AdminRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ msg: "Please Provide All The Details correctly" });
      return;
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

    const acessToken = jwt.sign(
      { userID: admin._id, status: admin.status, role: admin.role, email: admin.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1 day",
      }
    );

    const refToken = jwt.sign(
      {
        userID: admin._id,
        role: admin.role,
        email: admin.email,
        status: admin.status,
      },
      process.env.JWT_SECRET_REFRESH as string,
      {
        expiresIn: "2 day",
      }
    );

    res
      .status(200)
      .send({ msg: "login successful", userID: admin._id, name: admin.name, email: admin.email, acessToken, refToken, role: 'admin' });
  } catch (err) {
    log.info("POST /admin/login error", err.message);
    res
      .status(500)
      .send({
        msg: "something went wrong in logging doctor",
        error: err.message,
      });
  }
});

// Checking if AuthMiddleware is Working Fine
AdminRouter.get("/checkauth", AuthMiddleware, (req: Request, res: Response) => {
  try {
    res.send({ msg: "Protected Route working Fine ...", payload: req.body });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "something went wrong in auth", error: error.message });
  }
});

AdminRouter.post('/logout', async (req: Request, res: Response) => {
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

// Checking if Role Based Access is working fine
AdminRouter.get(
  "/checkrbac",
  AuthMiddleware,
  rbac(["admin"]),
  (req: Request, res: Response) => {
    try {
      res.send({
        msg: "Role based access working Fine ...",
        payload: req.body,
      });
    } catch (error) {
      res
        .status(500)
        .send({ msg: "something went wrong in auth", error: error.message });
    }
  }
);

//Start Writing Routes from here use rbac and authmiddleware if you want
// AdminRouter.use(AuthMiddleware);
// AdminRouter.use(rbac(['admin']))

AdminRouter.get(
  "/alldoctors", AuthMiddleware,
  rbac(["admin", "superadmin"]),
  async (req: Request, res: Response) => {
    try {
      let doctors = await DoctorModel.find({}, { password: 0 });
      res.status(200).send(doctors);
    } catch (error) {
      res
        .status(500)
        .send({ msg: "something went wrong in auth", error: error.message });
    }
  }
);

AdminRouter.get(
  "/allcustomers", AuthMiddleware,
  rbac(["admin", "superadmin"]),
  async (req: Request, res: Response) => {
    try {
      let customer = await CustomerModel.find({}, { password: 0 });
      res.status(200).send(customer);
    } catch (error) {
      res
        .status(500)
        .send({ msg: "something went wrong in auth", error: error.message });
    }
  }
);

AdminRouter.get(
  "/allpets", AuthMiddleware,
  rbac(["admin", "superadmin"]),
  async (req: Request, res: Response) => {
    try {
      let customer = await PetModel.find({}, { password: 0 });
      res.status(200).send(customer);
    } catch (error) {
      res
        .status(500)
        .send({ msg: "something went wrong in auth", error: error.message });
    }
  }
);

//<<<<<<<<<<<------------delete admin------------------>>>>>>>>>>>>>>>

AdminRouter.delete(
  "/delete/:id",
  rbac(["superadmin"]),
  async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
      let adm = await AdminModel.findByIdAndRemove({ _id: id });
      console.log(adm);
      res.status(200).send({ msg: "Admin Registered successfully", adm });
    } catch (err) {
      log.info("POST  /admin/delete error", err.message);
      res
        .status(500)
        .send({
          msg: "something went wrong in deletion customer",
          error: err.message,
        });
    }
  }
);

//<<<<<<<<<<<<<<<<-----------------blocking of user-------------------->>>>>>>>>>>>>>>>
// rbac(["superadmin","admin"])
AdminRouter.patch(
  "/status/:id",

  async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
      let adm = await CustomerModel.findOne({ _id: id });
      let ad = await CustomerModel.findByIdAndUpdate({ _id: id }, { status: !adm.status })
      // console.log(ad);
      res.status(200).send({ msg: "Admin Registered successfully", ad });
    } catch (err) {
      log.info("POST  /admin/delete error", err.message);
      res
        .status(500)
        .send({
          msg: "something went wrong in deletion customer",
          error: err.message,
        });
    }
  }
);





//<<<<<<<<<<<<<<<-----------------blocking pet-------------------->>>>>>>>>>>>>>>>>>>>

AdminRouter.patch(
  "/pet/status/:id",

  async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
      let adm = await PetModel.findOne({ _id: id });
      let ad = await PetModel.findByIdAndUpdate({ _id: id }, { "status.stat": !adm.status.stat })
      // console.log(ad);
      res.status(200).send({ msg: "Admin Registered successfully", ad });
    } catch (err) {
      log.info("POST  /admin/delete error", err.message);
      res
        .status(500)
        .send({
          msg: "something went wrong in deletion customer",
          error: err.message,
        });
    }
  }
);



//<<<<<<<<<<<<<--------------blocking for doctor------------------->>>>>>>>>>>>>>>


AdminRouter.patch(
  "/doctor/status/:id",

  async (req: Request, res: Response) => {
    let id = req.params.id;
    try {
      let adm = await DoctorModel.findOne({ _id: id });
      let ad = await DoctorModel.findByIdAndUpdate({ _id: id }, { status: !adm.status })
      // console.log(ad);
      res.status(200).send({ msg: "Admin Registered successfully", ad });
    } catch (err) {
      log.info("POST  /admin/delete error", err.message);
      res
        .status(500)
        .send({
          msg: "something went wrong in deletion customer",
          error: err.message,
        });
    }
  }
);




//<<<<<<<<<<<<<<------------------finding, sorting and filtering of pets -------------->>>>>>>>>>

//<<<<<<<<<<<<---------sorting using regex for further usage use accordingly ---------------------->>>>>>>>>>>>>>>>

// db.users.find({name: {$regex: /john/i}})
// AdminRouter.get("/findpet/:sort",async (req:Request,res:Response)=>{
//   let name=req.query.name as string
//   const regex = new RegExp(name, 'i')
//   let sort=req.params.sort
//   if(sort=="asc"){
//     let data=await PetModel.find({breed:{$regex: regex}}).sort({breed:1})
//     console.log(data);
//     res.status(200).send({ msg: "Admin Registered successfully", data });

//   }else{
//     let data=await PetModel.find({breed:{$regex: regex}}).sort({breed:-1})
//     console.log(data);
//     res.status(200).send({ msg: "Admin Registered successfully", data });
//   }
// })


//<<<<<<<<<<<<---------sorting using regex for further usage use accordingly ---------------------->>>>>>>>>>>>>>>>

export { AdminRouter };
