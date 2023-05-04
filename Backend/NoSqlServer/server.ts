import express, {Request, Response} from "express"
import { customerRoute } from "./Routes/Customer.routes"
import { authMiddleware } from "./Middlewares/Auth.middle"
import { roleMiddleware } from "./Middlewares/Role.middle"
const app=express()

app.use(express.json())


app.get("/", (req:Request, res:Response)=>{
    res.send("Home page")
})

app.use("/customer", customerRoute)

app.use(authMiddleware)

app.get("/", (req:Request, res:Response)=>{
    res.send("Hii Customer! I hope you are well...")
})





app.listen(4500, ()=>{
    console.log("Server Running")
})