import { Request, Response, NextFunction } from 'express';
const rbac = (permittedRoles: string[]) => {
  return (req: Request,res : Response,next : NextFunction)=>{
      let {role} = req.body;
      if(permittedRoles.includes(role)){
          next();
      }else{
        res.status(403).json({msg:"Access Denied"})
      }
  }
}

export { rbac };
