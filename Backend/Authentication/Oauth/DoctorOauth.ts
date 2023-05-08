// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()
import {
    Strategy as GoogleStrategy,
    StrategyOptionsWithRequest,
  } from "passport-google-oauth20";
  import passport from "passport";
  import { v4 as uuidv4 } from "uuid";
  import express, { Router } from "express";
  import { Document } from "mongoose";
  const DoctorRouter: Router = express.Router();
  import jwt from "jsonwebtoken";
import DoctorModel from "../model/DoctorModel";
 
// 221992717439-u77bv2tpqo6uhdbatucjbcasjnsi1828.apps.googleusercontent.com

// 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
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "221992717439-u77bv2tpqo6uhdbatucjbcasjnsi1828.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "https://salmon-coral-gear.cyclic.app/doctor/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        interface User {
          name: string;
          email: string;
          password: string;
          Role: string;
          UPRN: string;
          speciality: string[];
          status: boolean;
        }
        if (profile._json.email_verified) {
          let user: User | null;
          let name = profile._json.name;
          let email = profile._json.email;
  
          user = await DoctorModel.findOne({ email });
  
          if (user) {
            return cb(null, user);
          }
  
          const newUser = new DoctorModel({
            name: name,
            email: email,
            password: uuidv4(),
            Role: "doctor",
            status: true,
          });
  
          await newUser.save();
          return cb(null, newUser);
        }
      }
    )
  );

  DoctorRouter.get("/check", async (req,res)=>{
    let type=req.query.type
    let UPRN=req.query.UPRN

    console.log(type,UPRN)
    try {
      if(type==="signup"){

        let data=await DoctorModel.findOne({UPRN})
        if(data?.email){
          res.send({isExist:true})
        }else{
          res.send({isExist:false})
        }
      }else if(type==="login"){
        res.redirect(`https://salmon-coral-gear.cyclic.app/doctor/auth/google?type=login`)
      }
     
    } catch (error:any) {
     res.send({error:error.message})
    }
    // res.send("ok")
 })
  DoctorRouter.get(
    "/auth/google",(req,res,next)=>{
        const UPRN = req.query.UPRN;
        let type=req.query.type
  const state = JSON.stringify({ UPRN,type });
    passport.authenticate("google", { scope: ["profile", "email"],  state })(req, res, next);
    }
  );
  
  interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    Role: string;
    UPRN: string;
    speciality: string[];
    status: boolean;
  }
  
  DoctorRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/google/login",
      session: false,
    }),
   async function (req, res) {
      let user = req.user as IUser;
      let type=JSON.parse(req.query.state as string).type
      if(user.UPRN==="" && type==="signup"){
        const UPRN:any = JSON.parse(req.query.state as string).UPRN;
        let data= await DoctorModel.findByIdAndUpdate({_id:user["_id"]},{UPRN:UPRN})
        var token = jwt.sign(
          {
            email: user.email,
            id: user._id,
            status: user.status,
            name: user.name,
            role: user.Role,
          },
          "masai"
        );
        
        //  https://transcendent-horse-5d8cb8.netlify.app/masseges.html?id=${user._id}
        res.redirect(
          `https://yuvraj1307.github.io?token=${token}&name=${user.name}&role=${user.Role}`
        );
      }else if(user.UPRN==="" && type==="login"){
        let data=await DoctorModel.findByIdAndRemove({_id:user["_id"]})
        return res.redirect(`http://127.0.0.1:5501/Frontend/doctor_signup.html`)
      }else if(user.UPRN!=="" && type==="login"){
        var token = jwt.sign(
          {
            email: user.email,
            id: user._id,
            status: user.status,
            name: user.name,
            role: user.Role,
          },
          "masai"
        );
        
        //  https://transcendent-horse-5d8cb8.netlify.app/masseges.html?id=${user._id}
        res.redirect(
          `https://yuvraj1307.github.io?token=${token}&name=${user.name}&role=${user.Role}`
        );
      }
      
      // return res.redirect(`http://127.0.0.1:5501/Frontend/doctor_signup.html`)
      // // console.log(data)
      // // console.log(UPRN)
      // var token = jwt.sign(
      //   {
      //     email: user.email,
      //     id: user._id,
      //     status: user.status,
      //     name: user.name,
      //     role: user.Role,
      //   },
      //   "masai"
      // );
      
      // //  https://transcendent-horse-5d8cb8.netlify.app/masseges.html?id=${user._id}
      // res.redirect(
      //   `https://yuvraj1307.github.io?token=${token}&name=${user.name}&role=${user.Role}`
      // );
    }
  );




  
  export default DoctorRouter;
  




  // 750955027234-a6bv2r2bjf89nkmpqplc4pneluotueph.apps.googleusercontent.com


  //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