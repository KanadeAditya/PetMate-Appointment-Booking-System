const express = require('express')
const port = process.env.port 
import db from './models'
import DoctorRouter from './controllers/doctors.routes'
import CustomerRouter from './controllers/customers.routes'
import cors from 'cors'
import log from './logs'

const app = express()

app.use(cors())
app.use(express.json());
app.use('/doctors',DoctorRouter)
app.use('/customers',CustomerRouter)

app.get('/',(req: any,res: { send: (arg0: any) => void }) :void =>{
    try {
        res.send({msg:'working fine .....'})
    } catch (error:any) {
        log.info(`Error :- ${error.message}`)
        res.send(error)
    }
})


db.sequelize.sync().then(()=>{
    log.info(`DB ${process.env.DB_Name} has been connected to ${process.env.DB_host}`)
    app.listen(process.env.port,()=>{
        log.info(`App is running on port ${process.env.port}`)
    })
})