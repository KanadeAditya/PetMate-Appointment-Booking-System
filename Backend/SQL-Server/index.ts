const express = require('express')
const port = process.env.port 
import db from './models'
import DoctorRouter from './controllers/doctors.routes'


const app = express()

app.use(express.json());
app.use('/doctors',DoctorRouter)

app.get('/',(req: any,res: { send: (arg0: any) => void }) :void =>{
    try {
        res.send({msg:'working fine .....'})
    } catch (error:any) {
        console.log({msg:error.message})
        res.send(error)
    }
})


db.sequelize.sync().then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`App is running on port ${process.env.port}`)
    })
})