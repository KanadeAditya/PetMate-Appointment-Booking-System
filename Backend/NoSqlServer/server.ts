import express, {Request, Response} from "express"
import { CustomerRouter } from "./Routes/Customer.routes"
import {DoctorRouter} from './Routes/Doctors.routes'
import {AdminRouter} from './Routes/Admins.routes'
import {PetRouter} from './Routes/Pets.routes'
// import { AuthMiddleware } from "./Middlewares/Auth.middle"
// import { RoleMiddleware } from "./Middlewares/Role.middle"
import connection from './Config/db'
import log from "./logs"
import cors from 'cors'


const app=express()

//All immediate Middlewares here

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))


// All Routes are here 

app.get("/", (req:Request, res:Response)=>{
    res.send(`<h1>Server is working fine... </h1><h3>PORT :- ${process.env.port}<h3/>`)
})

// Routers Here 
app.use("/customers", CustomerRouter)
app.use('/doctors',DoctorRouter)
app.use('/admin',AdminRouter)
app.use('/pets',PetRouter)


// Db connected here
app.listen(process.env.port, async ()=>{
    try {
        await connection.then(()=>log.info(`Database Connected ....`))
        log.info(`server is running on ${process.env.port}`)
    } catch (error : any) {
        log.info('DB-error',`${error.message}`)
    }
})