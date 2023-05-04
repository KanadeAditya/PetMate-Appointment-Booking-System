"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Customer_Schema_1 = require("../Models/Customer.Schema");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const customerRoute = express_1.default.Router();
exports.customerRoute = customerRoute;
customerRoute.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await Customer_Schema_1.CustomerModel.findOne({ email });
        if (userExist) {
            res
                .status(400)
                .send({ msg: `Customer already registered with this ${email} id` });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const customer = new Customer_Schema_1.CustomerModel({ name, email, password: hashedPassword });
        await customer.save();
        res.status(200).send({ msg: "Customer Registered successfully" });
    }
    catch (err) {
        res
            .status(500)
            .send({ msg: "something went wrong in registering customer", error: err.message });
    }
});
customerRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Customer_Schema_1.CustomerModel.findOne({ email });
        if (!user) {
            res.status(400).send({ msg: "Invalid username and password" });
            return;
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).send({ msg: "Invalid username or password" });
            return;
        }
        const acessToken = jsonwebtoken_1.default.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1 day",
        });
        const refToken = jsonwebtoken_1.default.sign({ userID: user._id }, process.env.JWT_SECRET_REFRESH, {
            expiresIn: "1 day",
        });
        res.status(200).send({ acessToken, refToken });
    }
    catch (err) {
        res.status(500).send({ msg: "something went wrong in logging user", error: err.message });
    }
});
