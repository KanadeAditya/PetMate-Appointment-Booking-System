import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface TokenPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
      res.status(401).send({"msg": "login again"})
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    const { userId } = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' }); 
  }
};

export { authMiddleware };
