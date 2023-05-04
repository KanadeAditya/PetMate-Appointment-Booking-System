"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Customer_routes_1 = require("./Routes/Customer.routes");
const Auth_middle_1 = require("./Middlewares/Auth.middle");
const Role_middle_1 = require("./Middlewares/Role.middle");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Home page");
});
app.use("/customer", (0, Role_middle_1.roleMiddleware)(["customer"]), Customer_routes_1.customerRoute);
app.use(Auth_middle_1.authMiddleware);
app.get("/", (req, res) => {
    res.send("Hii Customer! I hope you are well...");
});
app.listen(4500, () => {
    console.log("Server Running");
});
