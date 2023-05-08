import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import { isBlacklisted } from './blacklisting';

interface TokenPayload {
  userID: string;
  role : string;
  status : boolean;
  email : string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const AuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if(await isBlacklisted(token)){
      res.send({msg:"Access Denied"})
      return
    }

    if(!token){
      res.status(401).send({"msg": "login again"})
    }else{
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
      const { userID  , status ,email ,role} = decodedToken;
      if(status){
        req.body.userID = userID; 
        req.body.status = status; 
        req.body.email = email; 
        req.body.role = role; 
        next();
        return;
      }else{
        res.send({msg : "Your Account is currently disabled, Kindly contact the admin"})
      }
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' ,error}); 
  }
};

export { AuthMiddleware };
