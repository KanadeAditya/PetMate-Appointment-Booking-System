import express, {Request, Response} from "express"

const app=express()

app.get("/", (req:Request, res:Response)=>{
    res.send("Home page")
})








app.listen(4500, ()=>{
    console.log("Server Running")
})