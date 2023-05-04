import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerModel } from "../Models/Customer.Schema";
import dotenv from 'dotenv';

dotenv.config();

const customerRoute = express.Router();

customerRoute.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await CustomerModel.findOne({ email });

    if (userExist) {
      res
        .status(400)
        .send({ msg: `Customer already registered with this ${email} id` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new CustomerModel({ name, email, password: hashedPassword });

    await customer.save();

    res.status(200).send({ msg: "Customer Registered successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "something went wrong in registering customer", error: err.message });
  }
});

customerRoute.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

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

    const acessToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1 day",
    });

    const refToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_REFRESH as string, {
      expiresIn: "1 day",
    });

    res.status(200).send({ acessToken, refToken });
  } catch (err) {
    res.status(500).send({ msg: "something went wrong in logging user", error: err.message });
  }
});

export { customerRoute };
