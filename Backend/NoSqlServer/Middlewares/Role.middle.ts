import { Request, Response, NextFunction } from 'express';

const roleMiddleware = (permittedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (!permittedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

export { roleMiddleware };
